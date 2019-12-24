import React, { PureComponent } from 'react';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';
import _get from 'lodash/get';
import {buildStaticUrl} from './url';
import Facebook from '../configs/facebook';
import Twitter from '../configs/twitter';
import og_default_image from '../../public/images/og_image.png';
import favicon from '../../public/favicon.ico';
import i18next from '../configs/i18next';
import AppConfig from '../configs/app';

export default class Meta extends PureComponent {

    constructor(props, context) {
        super(props, context);
    }

    getTitle() {
        return this.props.title || _get(this.props, 'og.title', i18next.t('metaTitle'));
    }
    getDescription() {
        return (
            this.props.description || _get(this.props, 'og.description', i18next.t('metaDescription'))
        );
    }
    renderFavicon() {
        return <link rel="shortcut icon" href={buildStaticUrl(favicon)} />;
    }
    renderOgImage() {
        const image =
            this.props.image || _get(this.props, 'og.image', og_default_image);
        return <meta property="og:image" content={buildStaticUrl(image)} />;
    }
    renderTwitterImage() {
        const image =
            this.props.image || _get(this.props, 'twitter.image', og_default_image);
        return <meta property="twitter:image" content={buildStaticUrl(image)} />;
    }
    getKeywords() {
        return this.props.keywords;
    }
    getIndexFollow() {
        let ret = [];
        if (this.props.index === false) {
            ret.push('NOINDEX');
        } else {
            ret.push('INDEX');
        }
        if (this.props.follow === false) {
            ret.push('NOFOLLOW');
        } else {
            ret.push('FOLLOW');
        }
        return ret.join(',');
    }
    getBreadcrumbSchema() {
        if (!this.props.breadcrumb) {
            return;
        }
        let breadcrumb = {
            '@context': 'http://schema.org',
            '@type': 'BreadcrumbList',
        };
        let itemListElement = [];
        if (this.props.breadcrumb instanceof Array) {
            for (let i = 0; i < this.props.breadcrumb.length; i++) {
                let item = this.props.breadcrumb[i];
                itemListElement.push({
                    '@type': 'ListItem',
                    position: i + 1,
                    item: {
                        '@id': this.getBaseUrl() + '/' + item.id,
                        name: item.name,
                    },
                });
            }
        }
        breadcrumb.itemListElement = itemListElement;
        return breadcrumb;
    }
    getCanonicalUrl() {
        if (this.props.urlCanonical) {
            return this.getBaseUrl() + this.props.urlCanonical;
        }
        let currentUrl = _get(this.context, 'router.route.location.pathname');
        return this.getBaseUrl() + currentUrl;
    }
    getBaseUrl() {
        return AppConfig.baseURL;
    }
    render() {
        const breadcrumbSchema = this.getBreadcrumbSchema();
        return (
            <Helmet>
                {this.renderFavicon()}
                <link rel="dns-prefetch" href={this.getBaseUrl()} />
                <meta charset="UTF-8" />
                <meta http-equiv="content-language" content="en" />
                <meta http-equiv="X-UA-Compatible" content="IE=Edge" />
                <meta
                    name="viewport"
                    content="width=device-width,initial-scale=1.0,minimum-scale=1, maximum-scale=1, user-scalable=no"
                />
                <title>{this.props.title}</title>
                <meta name="description" content={this.getDescription()} />
                <meta name="theme-color" content="#0c0c0c" />
                <meta name="msapplication-navbutton-color" content="#0c0c0c" />
                <meta name="apple-mobile-web-app-status-bar-style" content="#0c0c0c" />
                <meta name="robots" content={this.getIndexFollow()} />
                <meta name="revisit" content="1 days" />
                <meta name="dc.creator" content={i18next.t('siteName')} />
                <meta name="generator" content={i18next.t('domain')} />
                <meta property="fb:app_id" content={Facebook.FB_APP_ID} />
                <meta property="og:url" content={this.getCanonicalUrl()} />
                <meta property="og:type" content="website" />
                <meta property="og:title" content={this.getTitle(true)} />
                <meta property="og:description" content={this.getDescription(true)} />
                {this.renderOgImage()}
                <meta property="og:image:width" content="400" />
                <meta property="og:image:height" content="400" />
                <meta name="twitter:card" content="summary" />
                <meta name="twitter:site" content={i18next.t('siteName')} />
                <meta name="twitter:creator" content={Twitter.ACCOUNT} />
                <meta property="twitter:url" content={this.getCanonicalUrl()} />
                <meta property="twitter:title" content={this.getTitle(true)} />
                <meta
                    property="twitter:description"
                    content={this.getDescription(true)}
                />
                {this.renderTwitterImage()}
                <meta property="keywords" content={this.getKeywords()} />
                <link rel="canonical" href={this.getCanonicalUrl()} />
                {breadcrumbSchema &&
                <script type="application/ld+json">
                    {JSON.stringify(breadcrumbSchema)}
                </script>}
                {this.props.children}
            </Helmet>
        );
    }
};

Meta.contextTypes = {
    router: PropTypes.object,
};