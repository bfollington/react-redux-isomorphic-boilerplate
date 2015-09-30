import initDb from "db";
import {Server} from 'hapi';
import 'isomorphic-fetch';
import * as reducers from 'reducers';
import * as controllers from 'server/controllers';
import { createStore, combineReducers } from 'redux';
import good from "good";

import serverSideRender from "server/serverSideRender";

import api from "api/api";

api(controllers);

var db = initDb();

/**
 * Start Hapi server on port 8000.
 */
const server = new Server();
server.connection({port: process.env.PORT || 8000});

server.register({
    register: good,
    options: {
        reporters: [{
            reporter: require('good-console'),
            events: {
                response: '*',
                log: '*'
            }
        }]
    }
}, function (err) {
    if (err) {
        throw err; // something bad happened loading the plugin
    }

    server.start(function () {
        console.log('==> ✅  Server is listening');
        console.log('==> 🌎  Go to ' + server.info.uri.toLowerCase());
    });
});

for (var controller in controllers) {
  console.log("==> Registered", controller, "controller")
  for (var route in controllers[controller]) {
    server.route(controllers[controller][route]);
  }
}

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
