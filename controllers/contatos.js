module.exports = function(app) {
	var HomeController = {
		//Actions
		
		index: function(req, res){
			var usuario = req.session.usuario;
			var params = {usuario: usuario};

			res.render('contatos/index', params);
		}

	};
	return HomeController;
};