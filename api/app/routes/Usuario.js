const usuarioController = require('../controller/Usuario');

module.exports = (app) => {
  app.route('/usuario')
    .get(usuarioController.get)
}
