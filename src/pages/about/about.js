import React, { Component } from "react";
import Meta from "../../helpers/meta";
import TitleBar from "../../components/title-bar/title-bar";
import BreadCrumb from "../../components/breadcrumb/breadcrumb";
import i18next from "../../configs/i18next";
import styles from "./styles.css";
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import AppConfig from '../../configs/app';

class About extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            breadcrumbs: [
                {url: "/", name: i18next.t('siteName')},
                {url: "/about.html", name: i18next.t('about.title')}
            ]
        };
    }

    render() {
        return (
            <div>
                <Meta
                    title={i18next.t('about.metaTitle')}
                    description={i18next.t('metaDescription')}
                    keywords={i18next.t('metaKeywords')}
                />
                <div>
                    <TitleBar title={i18next.t('about.title')}/>
                    <BreadCrumb paths={this.state.breadcrumbs}/>
                    <div className={styles.aboutContainer}>
                        <p className={styles.welcome}>{i18next.t('about.welcomeSentence', { siteName: i18next.t('siteName')})}</p>
                    </div>
                </div>
            </div>
        );
    }
}

export default withStyles(styles)(About);