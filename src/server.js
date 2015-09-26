import {Server} from 'hapi';
import {match} from 'react-router';
import routes from 'views/Routes';
import url from 'url';
import * as reducers from 'reducers';
import { createStore, combineReducers } from 'redux';
const reducer = combineReducers(reducers);
const store = createStore(reducer);

import App from "App";
import React from "react";
import asciiJSON from "ascii-json";

import {plus} from 'actions/CounterActions';

import 'isomorphic-fetch';

/**
 * Start Hapi server on port 8000.
 */
const server = new Server();
server.connection({port: process.env.PORT || 8000});
server.start(() => {
  console.info('==> ✅  Server is listening');
  console.info('==> 🌎  Go to ' + server.info.uri.toLowerCase());
});

/**
 * Attempt to serve static requests from the public folder.
 */
server.route({
  method: '*',
  path: '/{params*}',
  handler: (request, reply) => {
    reply.file('static' + request.path);
  },
});

/**
 * Endpoint that proxies all GitHub API requests to https://api.github.com.
 */
server.route({
  method: '*',
  path: '/api/github/{path*}',
  handler: {
    proxy: {
      passThrough: true,
      mapUri(request, callback) {
        callback(null, url.format({
          protocol: 'https',
          host: 'api.github.com',
          pathname: request.params.path,
          query: request.query,
        }));
      },
    },
  },
});

/**
 * Catch dynamic requests here to fire-up React Router.
 */
server.ext('onPreResponse', (request, reply) => {
  if (typeof request.response.statusCode !== 'undefined') {
    return reply.continue();
  }

  match({ routes, location: { pathname: request.path } }, (error, redirectLocation, renderProps) => {

      if (redirectLocation) {
        reply.redirect(redirectLocation.pathname + redirectLocation.search).code(301);
      } else if (error) {
        reply(error.message).code(500);
      } else if (renderProps == null) {
        reply('Not found').code(404);
      } else {
        console.log("ready to reply");

        var initialState = {counter: 1};

        var dataToSeed = asciiJSON.stringify(initialState).replace(/<\//g, '<\\/');
        const webserver = process.env.NODE_ENV === 'production' ? '' : '//localhost:8080';

        var reactString = React.renderToString(<App initialState={initialState} />);
        var output = (
          `<!doctype html>
          <html lang='en-us'>
            <head>
              <meta charset='utf-8'>
              <title>Hapi Universal Redux</title>
              <link rel='shortcut icon' href='/favicon.ico'>
            </head>
            <body>
              <div id='react-root'>${reactString}</div>
              <script>window.__reactTransmitPacket='${dataToSeed}'</script>
              <script src="${webserver}/dist/client.js" type="text/javascript"></script>
            </body>
          </html>`
        );

        reply(output);
      }
  });
});
