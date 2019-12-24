import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import styles from './styles.css';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

export class BreadCrumb extends PureComponent {
    render() {
        return (
            <ul className={styles.breadcrumbs}>
                {this.props.paths.map((path, index) => {
                    if (index === this.props.paths.length - 1) return (<li key={index}><span>{path.name}</span></li>);
                        else return (<li key={index}><Link to={path.url}>{path.name}</Link></li>);
                    })
                }
            </ul>
        );
    }
}

export default withStyles(styles)(BreadCrumb);