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
//var routes = require('./routes');


// all environments
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.cookieParser('ntalk'));
app.use(express.session());
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));
app.use(error.notFound);
app.use(error.serverError);

/*Tem que sempre ficar no final*/
load('models')
	.then('controllers')
	.then('routes')
	.into(app);

io.sockets.on('connection', function(client) {
	client.on('send-server', function(data) {
		var msg = "<b>" + data.nome + ":</b> " + data.msg + "<br>";
		client.emit('send-client', msg);
		client.broadcast.emit('send-client', msg);
	});
});

//app.get('/', routes.index);
//app.get('/usuarios', routes.user.index);

server.listen(3000, function(){
	console.log("Ntalk no ar.");
});