require('es6-promise').polyfill();

// import Pano from './components/pollTwitter';


var socket = io('http://localhost:3000');
socket.on('tweet', function (data) {
  console.log(data);
});