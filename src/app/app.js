import React, {Component} from "react";
import {Route} from "react-router-dom";
import {Switch} from "react-router";
import Header from "../components/header/header";
import Footer from "../components/footer/footer";
import routes from "../routes/routes";

export default class App extends Component {

    constructor(props, context) {
        super(props, context);
    }

    render() {
        return (
            <div className="container">
                <Header/>
                <div className="container content">
                    <Switch>
                        {routes.map(({path, exact, component: C, ...rest}) => (
                            <Route key={path} path={path} exact={exact} render={(props) => (<C {...props} {...rest} />)} />
                        ))}
                    </Switch>
                </div>
                <Footer/>
            </div>
        );
    }
};