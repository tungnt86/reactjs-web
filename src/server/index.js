// Follows: https://tylermcginnis.com/react-router-server-rendering/

import React from 'react';
import express from "express";
import favicon from 'serve-favicon';
import cors from "cors";
import { renderToString } from "react-dom/server"
import { StaticRouter, matchPath } from 'react-router-dom';
import App from '../app/app';
import Helmet from 'react-helmet';
import routes from '../routes/routes';
import serialize from "serialize-javascript"
import ContextProvider from "../app/context-provider";
import AppConfigs from '../configs/app';

const app = express();

app.use(cors());
app.use(express.static("build"));
app.use(favicon('build/favicon.ico'));
app.get("*", (req, res, next) => {
    const activeRoute = routes.find((route) => matchPath(req.url, route)) || {};
    const promise = activeRoute.fetchData ? activeRoute.fetchData(req.path) : Promise.resolve();
    promise.then((response) => {
        const css = new Set();
        const data = response ? response.data || null : null;
        const context = {
            insertCss: (...styles) => styles.forEach(style => css.add(style._getCss())),
            data: data
        };
        const helmet = Helmet.renderStatic();
        const markup = renderToString(
            <StaticRouter location={req.url} context={context}>
                <ContextProvider context={context}>
                    <App />
                </ContextProvider>
            </StaticRouter>
        );

        res.status(200).send(`<!DOCTYPE html>
        <html ${helmet.htmlAttributes.toString()}>
        <head>
            ${helmet.title.toString()}
            ${helmet.meta.toString()}
            ${helmet.link.toString()}
            ${helmet.script.toString()}
            <style type="text/css">${[...css].join('')}</style>
            <script src="/bundle.js" defer ></script>
            <script>window.__INITIAL_DATA__ = ${serialize(data)}</script>
        </head>
        <body ${helmet.bodyAttributes.toString()}>
            <div id="root">${markup}</div>
        </body>
        </html>`
        );
    }).catch(next);
});

app.listen(AppConfigs.port, () => {
    console.log('Server is listening on port: ' + AppConfigs.port)
});