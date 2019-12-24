import React, { Component } from "react";
import styles from "./styles.css";
import withStyles from 'isomorphic-style-loader/lib/withStyles';

class Loading extends Component {

    constructor(props, context) {
        super(props, context);
    }

    render() {
        return (
            <div className={styles.loading}>
                <div className={styles.loader}>
                </div>
            </div>
        );
    }
}

export default withStyles(styles)(Loading);