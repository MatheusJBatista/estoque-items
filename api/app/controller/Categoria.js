const Categorias = require('../model/Categorias');
const findById = require('../utils/FindById');
const postPadrao = require('../utils/PostPadrao');
const updatePadrao = require('../utils/UpdatePadrao');
const deletePadrao = require('../utils/DeletePadrao');

module.exports.get = function (req,res) {
  var query;
  if (req.query.method) {
    switch (req.query.method.toLowerCase()) {
      case 'findbyid':
        findById(res,req.query.id,Categorias);
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

module.exports.post = function (req,res) {
  postPadrao(req,res,Categorias);
}

module.exports.put = function (req,res) {
  updatePadrao(req,res,Categorias);
}

module.exports.delete = function (req,res) {
  deletePadrao(req,res,Categorias);
}
