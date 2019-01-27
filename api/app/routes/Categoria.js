const CategoriaController = require('../controller/Categoria');

module.exports = function (app) {

  app.route('/categoria')
    .get(CategoriaController.get)
    .post(CategoriaController.post);

  app.route('/categoria/:id')
    .put((req,res,next) => {
      if (!req.params.id) {
        res.send("id é obrigatorio");
        return;
      }
      if (req.body._id) {
        delete req.body._id;
      }
      next();
    }, CategoriaController.put)
    .delete((req,res,next) => {
      if (!req.params.id) {
        res.send("id é obrigatorio");
        return;
      }
      next();
    }, CategoriaController.delete)

  // app.get('/categoria', (req,res)=>{
  //   CategoriaController.get(app,req,res)
  // });
  //
  // app.post('/categoria', (req,res)=>{
  //   req.assert('nome', 'Nome é obrigatorio').notEmpty();
  //   req.assert('disponivel', `'disponivel' é obrigatorio`).notEmpty();
  //   req.assert('disponivel', `'disponivel' é obrigatorio ser verdadeiro/falso`).isBoolean();
  //
  //   var erros = req.validationErrors();
  //
  //   if (erros) {
  //     res.json(erros);
  //     return;
  //   }
  //
  //   CategoriaController.post(app,req,res)
  // });
  //
  // app.put('/categoria', (req,res)=>{
  //   req.assert('id', 'id é obrigatorio').notEmpty();
  //   if (req.body.disponivel) {
  //     req.assert('disponivel', `'disponivel' deve ser verdadeiro/falso`).isBoolean();
  //   }
  //
  //   var erros = req.validationErrors();
  //
  //   if (erros) {
  //     res.json(erros);
  //     return;
  //   }
  //
  //   CategoriaController.put(app,req,res)
  // });
  //
  // app.delete('/categoria', (req,res)=>{
  //   req.assert('id', 'id é obrigatorio').notEmpty();
  //
  //   var erros = req.validationErrors();
  //
  //   if (erros) {
  //     res.json(erros);
  //     return;
  //   }
  //
  //   CategoriaController.delete(app,req,res)
  // });
}
