module.exports = function (app) {
  app.get('/marca', (req,res) => {
    require('../controller/Marca').get(app,req,res);
  })

  app.post('/marca', (req,res) => {
    req.assert('nome','nome é obrigatorio').notEmpty();

    var erros = req.validationErrors();

    if (erros) {
      res.json(erros);
      return;
    }

    require('../controller/Marca').post(app,req,res);
  })

  app.put('/marca', (req,res) => {
    req.assert('id','id é obrigatorio para update').notEmpty();

    var erros = req.validationErrors();

    if (erros) {
      res.json(erros);
      return;
    }

    require('../controller/Marca').put(app,req,res);
  })

  app.delete('/marca', (req,res) => {
    req.assert('id','id é obrigatorio para update').notEmpty();

    var erros = req.validationErrors();

    if (erros) {
      res.json(erros);
      return;
    }
    
    require('../controller/Marca').delete(app,req,res);
  })
}
