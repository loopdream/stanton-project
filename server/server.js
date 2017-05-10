'use strict';

require('dotenv').config();

var Hapi = require('hapi'),
  Routes = require('./routes'),
  Db = require('./config/db'),
  Config = require('./config/config');

var app = {};
app.config = Config;

var server = new Hapi.Server();
server.connection( Config.server );


server.register(require('inert'), (err) => {

    if (err) {
        throw err;
    }

    server.route(Routes.endpoints);

    server.start((err) => {

        if (err) {
            throw err;
        }

        console.log('Server running at:', server.info.uri);
    });
});