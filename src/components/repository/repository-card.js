import React, { Component } from "react";
import styles from './styles.css';
import defaultImage from '../../../public/images/no_image.png';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

class RepositoryCard extends Component {

    constructor(props, context) {
        super(props, context);
    }

    addDefaultSrc(ev){
        ev.target.src = defaultImage;
    }

    render() {
        return (
            <div key={this.props.repository.id} className={styles.articleContainer}>
                <div className={styles.contentContainer}>
                    <h2>
                        <a className={styles.articleTitle} title={this.props.repository.full_name} href={this.props.repository.url} target="_blank">{this.props.repository.full_name}</a>
                    </h2>
                    <span className={styles.articleUrl}>{this.props.repository.url}</span>
                    <span className={styles.articleDate}>stars: {this.props.repository.stargazers_count}, watchers: {this.props.repository.watchers_count}, fork: {this.props.repository.forks_count}</span>
                    <p className={styles.description}>{this.props.repository.description}</p>
                </div>
            </div>
        );
    }
}

export default withStyles(styles)(RepositoryCard);