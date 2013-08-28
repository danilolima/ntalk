/**
 * Module dependencies.
 */

var express = require('express');
var app = express();
var load = require('express-load');
var path = require('path');
var error = require('./middleware/error');
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);
const KEY = 'ntalk.sid';
const SECRET = 'ntalk';
var cookie = express.cookieParser(SECRET);
var store = new express.session.MemoryStore();
var sessOpts = {secret: SECRET, key: KEY, store: store};
var session = express.session(sessOpts);


// all environments
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(cookie);
app.use(session);
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(__dirname + '/public'));
app.use(error.notFound);
app.use(error.serverError);

/*Tem que sempre ficar no final*/
load('models')
	.then('controllers')
	.then('routes')
	.into(app);

load('sockets').into(io);

//app.get('/', routes.index);
//app.get('/usuarios', routes.user.index);

server.listen(3000, function(){
	console.log("Ntalk no ar.");
});