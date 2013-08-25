/**
 * Module dependencies.
 */

var express = require('express');
var load = require('express-load');
var path = require('path');
var error = require('./middleware/error');
//var routes = require('./routes');

var app = express();

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

//app.get('/', routes.index);
//app.get('/usuarios', routes.user.index);

app.listen(3000, function(){
	console.log("Ntalk no ar.");
});