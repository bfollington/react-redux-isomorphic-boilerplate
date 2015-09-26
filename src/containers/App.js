import React from "react";
import router from 'views/Routes';
import { createStore, combineReducers } from 'redux';
import {Provider} from 'react-redux';
import * as reducers from 'reducers/index';

import Todo from "models/Todo";


export default class App extends React.Component {
    constructor(props) {
        super(props);

        const reducer = combineReducers(reducers);
        this.store = createStore(reducer, this.props.initialState);
    }

    render() {
        return (
            <div>
                <Provider store={this.store}>
                    {this.props.children ? this.props.children : router}
                </Provider>
            </div>
        );
    }
}
