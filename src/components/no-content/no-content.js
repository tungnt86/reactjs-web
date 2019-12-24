import React, { Component } from "react";
import styles from "./styles.css";
import withStyles from 'isomorphic-style-loader/lib/withStyles';

class NoContent extends Component {

    constructor(props, context) {
        super(props, context);
    }

    render() {
        return (
            <div className={styles.noContentContainer}>
                <p className={styles.noContentText}>{this.props.message}</p>
            </div>
        );
    }
}

export default withStyles(styles)(NoContent);