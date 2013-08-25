/**
 * Module dependencies.
 */

var express = require('express');
var load = require('express-load');
var path = require('path');
//var routes = require('./routes');

var app = express();

// all environments
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

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