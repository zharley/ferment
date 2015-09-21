var Hapi = require('hapi');
var Good = require('good');
var Boom = require('boom');
var Formula = require('./models').Formula;
require('./database');

var server = new Hapi.Server();
server.connection({ port: 3000 });

server.route({
    method: 'GET',
    path: '/',
    handler: function (request, reply) {
        Formula.find({}, function(err, events) {
            if (!err) {
                reply(events);
            } else {
                reply(Boom.badImplementation(err)); // 500 error
            }
        });
    }
});

server.route({
    method: 'GET',
    path: '/{name}',
    handler: function (request, reply) {
        Formula.find({ name: new RegExp('.*' + request.params.name + '.*')}, function(err, events) {
            if (!err) {
                reply(events);
            } else {
                reply(Boom.badImplementation(err)); // 500 error
            }
        });
    }
});

server.register({
    register: Good,
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
        server.log('info', 'Server running at: ' + server.info.uri);
    });
});
