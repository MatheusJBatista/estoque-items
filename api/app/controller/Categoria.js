const Categorias = require('../model/Categorias');

module.exports.get = function (app,req,res) {
  var query;
  if (req.query.method) {
    switch (req.query.method.toLowerCase()) {
      case 'findbyid':
        require('../utils/FindById')(res,req.query.id,Categorias);
        return;
        break;

      default: res.json({error: 'Metodo inválido'});

    }
  }else {
    query = Categorias.find({});
  }

  if (query) {
    query.exec((err,docs) => {
      if (err) {
        res.json(err);
        return;
      }
      res.json(docs);
    })
  }
}

module.exports.post = function (app,req,res) {
  require('../utils/PostPadrao')(app,req,res,Categorias);
}

module.exports.put = function (app,req,res) {
  require('../utils/UpdatePadrao')(app,req,res,Categorias);
}

module.exports.delete = function (app,req,res) {
  require('../utils/DeletePadrao')(app,req,res,Categorias);
}
