'use strict';

require('dotenv').config();

const Hapi = require('hapi');
const mongoose = require('mongoose');
const config = require('./config/config');
const Inert = require('inert');
/*
http://mph-web.de/build-a-restful-api-using-hapi-js-and-mongodb/
https://www.cronj.com/blog/hapi-mongoose/
*/

const server = new Hapi.Server();
server.connection(config.server);
const io = require('socket.io')(server.listener);

//Connect to db
mongoose.connect(
  config.database.prodUrl, 
  config.database.options
);
 


io.on('connection', function (socket) {
    socket.emit('Oh hii!');
    socket.on('burp', function () {
        socket.emit('Excuse you!');
    });
});



// Load plugins and start server
server.register([ 
  Inert,  
  require('./routes/tweets'),
  require('./routes/static')
], (err) => {

  if (err) {
    throw err;
  }

  // Start the server
  server.start((err) => {
    console.log('Server running at:', server.info.uri);
  });

});