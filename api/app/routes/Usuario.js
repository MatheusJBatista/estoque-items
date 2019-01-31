const usuarioController = require('../controller/Usuario');
const crypto = require('crypto');

module.exports = (app) => {
  app.route('/usuario/login')
    .post((req,res,next) => {
      req.body.senha = crypto.createHash("md5")
                      .update(req.body.senha)
                      .digest("hex");
      next();
    }, usuarioController.login)
    .get(usuarioController.session);

  app.route('/usuario/register')
    .post((req,res,next) => {
      req.body.senha = crypto.createHash("md5")
                      .update(req.body.senha)
                      .digest("hex");
      next();
    }, usuarioController.register);

  app.route('/usuario/logout')
    .get(usuarioController.logout);
}
