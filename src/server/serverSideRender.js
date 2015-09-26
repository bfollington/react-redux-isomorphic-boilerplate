import App from "containers/App";
import React from "react";
import ReactDOMServer from "react-dom/server";
import asciiJSON from "ascii-json";

import {match, RoutingContext} from 'react-router';

import routes from 'views/Routes';

import basePage from "server/basePage";

export default function(request, reply) {
    match({ routes, location: { pathname: request.path } }, (error, redirectLocation, renderProps) => {
        if (redirectLocation) {

            reply.redirect(redirectLocation.pathname + redirectLocation.search).code(301);

        } else if (error) {

            reply(error.message).code(500);

        } else if (renderProps == null) {

            reply('Not found').code(404);

        } else {

            var initialState = {counter: 1};

            var dataToSeed = asciiJSON.stringify(initialState).replace(/<\//g, '<\\/');
            const webserver = process.env.NODE_ENV === 'production' ? '' : '//localhost:8080';

            var reactString = ReactDOMServer.renderToString(<App initialState={initialState}><RoutingContext {...renderProps} /></App>);
            var output = basePage(reactString, dataToSeed, webserver);

            reply(output);

        }
    });
}
