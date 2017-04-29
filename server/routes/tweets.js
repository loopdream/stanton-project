'use strict';

const Boom = require('boom');
const Joi = require('joi');
const Tweet = require('../models/tweet');

exports.register = function (server, options, next) {


    // server.route({
    //     method: 'GET',
    //     path: '/',
    //     handler: function (request, reply) {
    //         reply('Hello, world!');
    //     }
    // });


    server.route({
        method: 'GET',
        path: '/tweets',
        handler: function (request, reply) {
            
            Tweet.find({ processed: false }, function (err, tweets) {
              if (err) return console.error(err);
              // console.log(tweets);
              var html = '<ul>';
              for (var i = tweets.length - 1; i >= 0; i--) {
                 html += '<li>' + tweets[i].tweet + '<br>' + tweets[i].created + '</li>';
              };
              html += '</ul>';

              reply('Tweets, <br>' + html + '!');
            });

            // db.tweets.find((err, docs) => {

            //     if (err) {
            //         return reply(Boom.wrap(err, 'Internal MongoDB error'));
            //     }
            //     reply(docs);
            // });

        }
    });

    server.route({
        method: 'GET',
        path: '/tweets/{id}',
        handler: function (request, reply) {

            // db.tweets.findOne({
            //     _id: request.params.id
            // }, (err, doc) => {

            //     if (err) {
            //         return reply(Boom.wrap(err, 'Internal MongoDB error'));
            //     }

            //     if (!doc) {
            //         return reply(Boom.notFound());
            //     }

            //     reply(doc);
            // });

        }
    });

    return next();
};

exports.register.attributes = {
    name: 'routes-tweets'
};