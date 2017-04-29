'use strict';



exports.register = function (server, options, next) {

server.route({
        method: 'GET',
        path: '/index.html',
        handler: function (request, reply) {
            reply.file('../static/index.html');
        }
    });


    return next();
};

exports.register.attributes = {
    name: 'routes-static'
};