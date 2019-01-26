module.exports = function (res,id,model) {
  if (!id) {
    res.json({error: 'ID deve ser informado quando utilizar metodos de busca'});
    return;
  }
  model.findById(id).exec((err,docs) => {
    if (err) {
      res.json(err);
    }
    res.json(docs);
  })
}
