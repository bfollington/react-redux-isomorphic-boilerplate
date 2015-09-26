import React from "react";

import { Router } from "react-router";
import routes from 'views/Routes';
import { createStore, combineReducers } from 'redux';
import {Provider} from 'react-redux';
import * as reducers from 'reducers/index';

import createMemoryHistory from 'history/lib/createMemoryHistory';
import createBrowserHistory from 'history/lib/createBrowserHistory';

export default class App extends React.Component {
    constructor(props) {
        super(props);

        const reducer = combineReducers(reducers);
        this.store = createStore(reducer, this.props.initialState);
    }

    render() {

        var history;

        try {
            window;
            history = createBrowserHistory;
        } catch (err) {
            history = createMemoryHistory;
        }

        return (
            <Provider store={this.store}>
                {() => <Router history={history()}>{routes}</Router>}
            </Provider>
        );
    }
}
