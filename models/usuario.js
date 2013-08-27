module.exports = function(app) {

  //var Schema = require('mongoose').Schema;

  var contato = {
    nome: String, 
    email: String
  };

  var usuario = {
    nome: {type: String, required: true}
  , email: {type: String, required: true
          , index: {unique: true}}
  , contatos: [contato]
  };

  //return app.db.model('usuarios', usuario);
  return usuario;
};