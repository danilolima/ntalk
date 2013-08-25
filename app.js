
/**
 * Module dependencies.
 */

var express = require('express');
var load = require('express-load');
var routes = require('./routes');

var app = express();

load('models')
	.then('controllers')
	.then('routes')
	.into(app);

// all environments
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', routes.index);
app.get('/usuarios', routes.user.index);

app.listen(3000, function(){
	console.log("Ntalk no ar.");
});