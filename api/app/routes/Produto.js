module.exports = function (app) {
  app.get('/produto',(req,res)=>{
    require('../controller/Produto').get(app,req,res);
  })

  app.post('/produto',(req,res)=>{
    req.assert('nome','nome do produto é obrigatorio').notEmpty();
    req.assert('descricao','descricao do produto é obrigatorio').notEmpty();
    req.assert('disponivel',`'disponivel' do produto é obrigatorio`).notEmpty();
    req.assert('categoria','categoria do produto é obrigatorio').notEmpty();
    req.assert('marca','marca do produto é obrigatorio').notEmpty();
    req.assert('preco','preco do produto é obrigatorio').notEmpty();

    req.assert('preco','preco deve ser numerico').isDecimal();
    req.assert('disponivel','disponivel deve ser obrigatoriamente verdadeiro/falso').notEmpty();

    var erros = req.validationErrors();

    if (erros) {
      res.json(erros);
      return;
    }

    require('../controller/Produto').post(app,req,res);
  })

  app.put('/produto',(req,res)=>{
    req.assert('id', 'id é obrigatorio para exclusão').notEmpty();
    if (req.body.disponivel) {
      req.assert('disponivel', `'disponivel' é obrigatorio ser verdadeiro/falso`).isBoolean();
    }

    var erros = req.validationErrors();

    if (erros) {
      res.json(erros);
      return;
    }


    require('../controller/Produto').put(app,req,res);
  })

  app.delete('/produto',(req,res)=>{
    req.assert('id', 'id é obrigatorio para exclusão').notEmpty();

    var erros = req.validationErrors();

    if (erros) {
      res.json(erros);
      return;
    }

    require('../controller/Produto').delete(app,req,res);
  })
}
