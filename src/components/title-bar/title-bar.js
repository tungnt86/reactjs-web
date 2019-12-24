import React, { Component } from "react";
import styles from "./styles.css";
import withStyles from 'isomorphic-style-loader/lib/withStyles';

class TitleBar extends Component {

    constructor(props, context) {
        super(props, context);
    }

    render() {
        return (
            <div className={styles.titleBar}>
                <h1>{this.props.title}</h1>
            </div>
        );
    }
}

export default withStyles(styles)(TitleBar);