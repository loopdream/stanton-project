var Tweet = require('./controller/tweet'),
  Static = require('./static');

// API Server Endpoints
exports.endpoints = [
  { method: 'GET',  path: '/{somethingss*}', config: Static.get },
  { method: 'GET', path: '/tweet', config: Tweet.getAll},
  { method: 'GET', path: '/tweet/{tweetId}', config: Tweet.getOne}
];