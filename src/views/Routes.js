import React from 'react';
import {Route, Router} from 'react-router';
import Main from 'views/Main';
import Another from 'views/Another';

import createMemoryHistory from 'history/lib/createMemoryHistory';
import createBrowserHistory from 'history/lib/createBrowserHistory';

var history;

try {
    window;
    history = createBrowserHistory();
} catch (err) {
    history = createMemoryHistory();
}

import routerLinkBinder from "injectors/routerLinkBinder";
// routerLinkBinder(history);

/**
 * The React Routes for both the server and the client.
 *
 * @class Routes
 */
export default (
    <Router history={history}>
        <Route path="/" component={Main} />
        <Route path="/another" component={Another} />
    </Router>
);
