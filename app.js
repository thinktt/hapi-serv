'use strict';

var Hapi = require('hapi'); 
var server = new Hapi.Server(); 
var Path = require('path');
var goodConfig;


server.connection({
	port: 3000
});

server.start(function() {
	console.log('Server running at:', server.info.uri);
});

//............Routes................
server.route({
	method: 'GET',
	path: '/greeting',
	handler: function(request, reply) {
		reply('Howdy!');
	}
});

server.route({
    method: 'GET',
    path: '/matrix/{param*}',
    handler: {
        directory: {
            path: 'public'
        }
    }
});


//............Logging..............
goodConfig = {
	opsInterval: 1000,
	reporters: [{
		reporter: require('good-console'),
		events: { log: '*', response: '*' }
	}]
};

server.register({
	register: require('good'),
	options: goodConfig
}, 
function (err) {
	if (err) console.error(err);
});

server.register(require('inert'), (err) => {
	if (err) {
		throw err;
	}
});





