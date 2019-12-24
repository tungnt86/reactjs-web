import React from "react";
import Repository from "../pages/repository/repository";
import About from "../pages/about/about";
import Contact from "../pages/contact/contact";
import PageNotFound from "../pages/404/404";
import {fetchTrendingRepositories} from "../api/fetch-data";
import Settings from "../configs/settings";

const routes = [
    {
        path: '/',
        exact: true,
        component: Repository,
        language: 'Go',
        fetchData: (path = '') => fetchTrendingRepositories('Go')
    },
    {
        path: '/about.html',
        exact: true,
        component: About
    },
    {
        path: '/contact.html',
        exact: true,
        component: Contact
    },
    {
        path: '/trending-repositories/go',
        exact: true,
        component: Repository,
        language: 'Go',
        fetchData: (path = '') => fetchTrendingRepositories('Go')
    },
    {
        path: '/trending-repositories/java',
        exact: true,
        component: Repository,
        language: 'java',
        fetchData: (path = '') => fetchTrendingRepositories('java')
    },
    {
        path: '/:any',
        exact: false,
        component: PageNotFound
    },
];

export default routes;