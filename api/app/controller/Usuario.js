const Usuarios = require('../model/Usuarios');
const postPadrao = require('../utils/PostPadrao');

module.exports.session = (req,res) => {
  if (req.session.usuario) {
    res.json(req.session.usuario)
    return
  }
  res.sendStatus(423);
}

module.exports.login = (req,res) => {
  Usuarios.find({
    usuario: req.body.usuario,
    senha: req.body.senha
  }).exec((err,usuario) => {
    if (err) {
      res.send(err);
      return;
    }
    req.session.usuario = usuario[0];
    res.json(usuario);
  })
}

module.exports.register = (req,res) => {

  Usuarios.find({usuario: req.body.usuario}).exec((err,usuario) => {
    if (err) {
      res.json(err);
      return
    }
    if (!usuario[0]) {
      const usuario = new Usuarios(req.body);

      console.log(req.body);

      usuario.save((err, docs)=>{
        if (err) {
          res.json(err);
          return;
        }
        req.session.usuario = docs
        res.redirect('/usuario/login')
      })
    }
    else {
      res.sendStatus(412)
    }
  })

}

module.exports.logout = (req,res) => {
  req.session.destroy();
  res.sendStatus(200);
}
