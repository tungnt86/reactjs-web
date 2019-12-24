import React from "react";
import { hydrate } from "react-dom";
import {BrowserRouter} from "react-router-dom";
import ContextProvider from "../app/context-provider";

const context = {
    insertCss: (...styles) => {
        const removeCss = styles.map(x => x._insertCss());
        return () => {
            removeCss.forEach(f => f());
        };
    },
};

hydrate(
    <BrowserRouter>
        <ContextProvider context={context} />
    </BrowserRouter>,
    document.getElementById("root")
);