const ProdutoController = require('../controller/Produto');

module.exports = function (app) {

  app.route('/produto')
    .get(ProdutoController.get)
    .post(ProdutoController.post);

  app.route('/produto/:id')
    .put((req,res,next)=> {
      if (!req.params.id) {
        res.send('id é obrigatorio');
        return;
      }
      if (req.body._id) {
        delete req.body._id
      }
      next()
    }, ProdutoController.put)
    .delete((req,res,next) => {
      if (!req.params.id) {
        res.send('id é obrigatorio');
        return;
      }
      next()
    }, ProdutoController.delete);

  // app.get('/produto',(req,res)=>{
  //   ProdutoController.get(app,req,res);
  // })
  //
  // app.post('/produto',(req,res)=>{
  //   req.assert('nome','nome do produto é obrigatorio').notEmpty();
  //   req.assert('descricao','descricao do produto é obrigatorio').notEmpty();
  //   req.assert('disponivel',`'disponivel' do produto é obrigatorio`).notEmpty();
  //   req.assert('categoria','categoria do produto é obrigatorio').notEmpty();
  //   req.assert('marca','marca do produto é obrigatorio').notEmpty();
  //   req.assert('preco','preco do produto é obrigatorio').notEmpty();
  //
  //   req.assert('preco','preco deve ser numerico').isDecimal();
  //   req.assert('disponivel','disponivel deve ser obrigatoriamente verdadeiro/falso').notEmpty();
  //
  //   var erros = req.validationErrors();
  //
  //   if (erros) {
  //     res.json(erros);
  //     return;
  //   }
  //
  //   ProdutoController.post(app,req,res);
  // })
  //
  // app.put('/produto',(req,res)=>{
  //   req.assert('id', 'id é obrigatorio para exclusão').notEmpty();
  //   if (req.body.disponivel) {
  //     req.assert('disponivel', `'disponivel' é obrigatorio ser verdadeiro/falso`).isBoolean();
  //   }
  //
  //   var erros = req.validationErrors();
  //
  //   if (erros) {
  //     res.json(erros);
  //     return;
  //   }
  //
  //
  //   ProdutoController.put(app,req,res);
  // })
  //
  // app.delete('/produto',(req,res)=>{
  //   req.assert('id', 'id é obrigatorio para exclusão').notEmpty();
  //
  //   var erros = req.validationErrors();
  //
  //   if (erros) {
  //     res.json(erros);
  //     return;
  //   }
  //
  //   ProdutoController.delete(app,req,res);
  // })
}
