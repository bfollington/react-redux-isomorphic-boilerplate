import initDb from "db";
import {Server} from 'hapi';
import 'isomorphic-fetch';
import * as reducers from 'reducers';
import { createStore, combineReducers } from 'redux';

import serverSideRender from "server/serverSideRender";

initDb();

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
 * Catch dynamic requests here to fire-up React Router.
 */
server.ext('onPreResponse', (request, reply) => {
  if (typeof request.response.statusCode !== 'undefined') {
    return reply.continue();
  }

  serverSideRender(request, reply);
});
