module.exports = function(app) {
	var HomeController = {
		//Actions
		
		index: function(req, res){
			var usuario = req.session.usuario;
			var contatos = usuario.contatos;
			var params = {usuario: usuario};

			res.render('contatos/index', params);
		},

		create: function(req, res){
			var contato = req.body.contato;
			var usuario = req.session.usuario;

			usuario.contato.push(contato);

			res.render('/contatos');
		},

		show: function(req, res){
			var id = req.params.id;
			var contato = req.session.usuario.contatos[id];
			var params = {contato: contato, id: id};

			res.render('/contatos/show', params);
		},

		edit: function(req, res){
			var id = req.params.id;
			var usuario = req.session.usuario;
			var contato = usuario.contatos[id];
			var params = {usuario: usuario, contato: contato, id: id};

			res.render('/contatos/edit' params);
		},

		update: function(req, res){
			var usuario = req.session.usuario;
			var id = req.params.id;

			usuario.contatos.splice(id, 1);

			res.redirect('/contatos');
		}

	};
	return HomeController;
};