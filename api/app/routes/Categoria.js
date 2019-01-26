module.exports = function (app) {
  app.get('/categoria', (req,res)=>{
    require('../controller/Categoria').get(app,req,res)
  });

  app.post('/categoria', (req,res)=>{
    req.assert('nome', 'Nome é obrigatorio').notEmpty();
    req.assert('disponivel', `'disponivel' é obrigatorio`).notEmpty();
    req.assert('disponivel', `'disponivel' é obrigatorio ser verdadeiro/falso`).isBoolean();

    var erros = req.validationErrors();

    if (erros) {
      res.json(erros);
      return;
    }

    require('../controller/Categoria').post(app,req,res)
  });

  app.put('/categoria', (req,res)=>{
    req.assert('id', 'id é obrigatorio').notEmpty();
    if (req.body.disponivel) {
      req.assert('disponivel', `'disponivel' deve ser verdadeiro/falso`).isBoolean();
    }

    var erros = req.validationErrors();

    if (erros) {
      res.json(erros);
      return;
    }

    require('../controller/Categoria').put(app,req,res)
  });

  app.delete('/categoria', (req,res)=>{
    req.assert('id', 'id é obrigatorio').notEmpty();

    var erros = req.validationErrors();

    if (erros) {
      res.json(erros);
      return;
    }

    require('../controller/Categoria').delete(app,req,res)
  });
}
