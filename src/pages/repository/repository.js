import React, { Component } from "react";
import Meta from "../../helpers/meta";
import styles from "./styles.css";
import i18next from "../../configs/i18next";
import Settings from "../../configs/settings";
import {NavLink} from "react-router-dom";
import Loading from "../../components/loading/loading";
import NoContent from "../../components/no-content/no-content";
import RepositoryCard from "../../components/repository/repository-card";
import { fetchTrendingRepositories } from "../../api/fetch-data";
import withStyles from 'isomorphic-style-loader/lib/withStyles';

class Repository extends Component {
    constructor(props, context) {
        super(props, context);

        let data = {};
        if (__isBrowser__) {
            data = window.__INITIAL_DATA__;
            delete window.__INITIAL_DATA__;
        } else {
            data = this.props.staticContext.data;
        }
        const repositories = data ? data.items || null : null;

        this.state = {
            language: 'go',
            repositories: repositories.slice(0, 5),
            isLoading: !repositories,
            error: null
        };

        this.handleFetchSuccess = this.handleFetchSuccess.bind(this);
        this.handleFetchFailure = this.handleFetchFailure.bind(this);
    }

    componentDidMount() {
        this._isMounted = true;
        if (!this.state.repositories) {
            this.fetchTrendingRepositories(this.props.language);
        }
    }

    componentDidUpdate (prevProps, prevState) {
        if (prevProps.match.path !== this.props.match.path) {
            this.fetchTrendingRepositories(this.props.language);
        }
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    handleOnNavClick(language) {
        if (!this._isMounted) {
            setTimeout(() => this.handleOnNavClick(language));
            return;
        }
        this.setState({language: language});
        this.fetchTrendingRepositories(this.props.language);
    }

    fetchTrendingRepositories(language) {
        if (!this._isMounted) {
            setTimeout(() => this.fetchTrendingRepositories(language));
            return;
        }

        this.setState({ isLoading: true });
        const promise = fetchTrendingRepositories(language);
        promise.then((response) => this.handleFetchSuccess(response))
            .catch(error => this.handleFetchFailure(error));
    }

    handleFetchSuccess(response) {
        const repositories = response.data.items || [];

        this.setState({
            repositories: repositories.slice(0, 5),
            error: null,
            isLoading: false
        })
    }

    handleFetchFailure(error) {
        this.setState({
            repositories: [],
            error: error,
            isLoading: false
        })
    }

    renderRepositories() {
        return (
            <div className={styles.articles}>
                {
                    this.state.repositories.map(function (repository, key) {
                        return (<RepositoryCard key={key} repository={repository}/>);
                    })
                }
            </div>
        );
    }

    renderLoading() {
        return (<Loading/>);
    }

    renderContent() {
        if (this.state.isLoading) {
            return this.renderLoading();
        }
        if (this.state.error || 0 === this.state.repositories.length) {
            return (<NoContent message={i18next.t('repositoryPage.noTopicFound')}/>);
        }
        return this.renderRepositories();
    }

    getTitle() {
        switch (this.props.span) {
            case "go": return i18next.t('repositoryPage.metaTitle', {language: 'go'});
            case "java": return i18next.t('repositoryPage.metaTitle', {language: 'java'});
            default: return i18next.t('repositoryPage.metaTitle', {language: 'go'});
        }
    }

    getDescription() {
        switch (this.props.span) {
            case "go": return i18next.t('repositoryPage.metaDescription', {language: 'go'});
            case "java": return i18next.t('repositoryPage.metaDescription', {language:'java'});
            default: return i18next.t('repositoryPage.metaDescription', {language: 'go'});
        }
    }

    getKeywords() {
        return i18next.t('metaKeywords');
    }

    render() {
        const activeItem = {color: '#FFF', backgroundColor: '#FF7D5A'};
        return (
            <div>
                <Meta
                    title={this.getTitle()}
                    description={this.getDescription()}
                    keywords={this.getKeywords()}
                />
                <div className={styles.topicPage}>
                    <ul className={styles.topicNav}>
                        <li><NavLink activeStyle={activeItem} to="/trending-repositories/go" onClick={() => {this.handleOnNavClick("go")}}>go</NavLink></li>
                        <li><NavLink activeStyle={activeItem} to="/trending-repositories/java" onClick={() => {this.handleOnNavClick("java")}}>java</NavLink></li>
                    </ul>
                    <div className={styles.topicCloud}>
                        {this.renderContent()}
                    </div>
                </div>
            </div>
        );
    }
}

export default withStyles(styles)(Repository);