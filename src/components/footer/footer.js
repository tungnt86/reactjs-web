import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import i18next from '../../configs/i18next';
import classnames from 'classnames';
import styles from './styles.css';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

export class Footer extends PureComponent {
    render() {
        return (
            <footer>
                <div className={classnames({
                    'container': true,
                    [styles.footer]: true,
                })}>
                    <div className={styles.footerLeft}>
                        <p>&copy;2018 - {i18next.t('siteName')}</p>
                    </div>
                    <div className={styles.footerRight}>
                        <ul>
                            <li><Link to="/about.html">{i18next.t('footer.about')}</Link></li>
                            <li><Link to="/contact.html">{i18next.t('footer.contact')}</Link></li>
                        </ul>
                    </div>
                </div>
            </footer>
        );
    }
}

export default withStyles(styles)(Footer);