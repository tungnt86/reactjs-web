import React, { Component } from "react";
import Meta from "../../helpers/meta";
import i18next from "../../configs/i18next";
import TitleBar from "../../components/title-bar/title-bar";
import BreadCrumb from "../../components/breadcrumb/breadcrumb";
import styles from "./styles.css";
import withStyles from 'isomorphic-style-loader/lib/withStyles';

class PageNotFound extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            breadcrumbs: [
                {url: "/", name: i18next.t('siteName')},
                {url: "/404.html", name: i18next.t('pageNotFound.pageNotFound')}
            ]
        };
    }

    render() {
        return (
            <div>
                <Meta
                    title={i18next.t('pageNotFound.metaTitle')}
                    description={i18next.t('metaDescription')}
                    keywords={i18next.t('metaKeywords')}
                />
                <div>
                    <TitleBar title={i18next.t('pageNotFound.pageNotFound')}/>
                    <BreadCrumb paths={this.state.breadcrumbs}/>
                    <div className={styles.pageNotFoundContent}>
                        <p>{i18next.t('pageNotFound.pageNotFound')}</p>
                    </div>
                </div>
            </div>
        );
    }
}

export default withStyles(styles)(PageNotFound);