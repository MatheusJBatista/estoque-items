const MarcaController = require('../controller/Marca');

module.exports = function (app) {

  app.route('/marca')
    .get(MarcaController.get)
    .post(MarcaController.post);

  app.route('/marca/:id')
    .put((req,res,next) => {
      if (!req.params.id) {
        res.send("id é obrigatorio");
        return;
      }
      if (req.body._id) {
        delete req.body._id
      }
      next();
    }, MarcaController.put)
    .delete((req,res,next) => {
      if (!req.params.id) {
        res.send("id é obrigatorio");
        return;
      }
      next();
    }, MarcaController.delete);


  // app.get('/marca', (req,res) => {
  //   MarcaController.get(app,req,res);
  // })
  //
  // app.post('/marca', (req,res) => {
  //   req.assert('nome','nome é obrigatorio').notEmpty();
  //
  //   var erros = req.validationErrors();
  //
  //   if (erros) {
  //     res.json(erros);
  //     return;
  //   }
  //
  //   MarcaController.post(app,req,res);
  // })
  //
  // app.put('/marca', (req,res) => {
  //   req.assert('id','id é obrigatorio para update').notEmpty();
  //
  //   var erros = req.validationErrors();
  //
  //   if (erros) {
  //     res.json(erros);
  //     return;
  //   }
  //
  //   MarcaController.put(app,req,res);
  // })
  //
  // app.delete('/marca', (req,res) => {
  //   req.assert('id','id é obrigatorio para update').notEmpty();
  //
  //   var erros = req.validationErrors();
  //
  //   if (erros) {
  //     res.json(erros);
  //     return;
  //   }
  //
  //   MarcaController.delete(app,req,res);
  // })
}
