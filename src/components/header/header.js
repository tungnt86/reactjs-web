import React, {PureComponent} from "react";
import {Link} from 'react-router-dom';
import logo from '../../../public/images/logo.png';
import i18next from '../../configs/i18next';
import styles from './styles.css';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

class Header extends PureComponent {
    render() {
        return (
            <div className={styles.header}>
                <div className={styles.logoContainer}>
                    <Link to="/"><img className={styles.logo} src={logo}/></Link>
                </div>
                <div className={styles.nameContainer}>
                    <Link className={styles.siteName} to="/">{i18next.t('siteName')}</Link>
                    <Link className={styles.slogan} to="/">{i18next.t('slogan')}</Link>
                </div>
            </div>
        );
    }
}

export default withStyles(styles)(Header);