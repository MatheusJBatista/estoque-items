module.exports = function (req,res,model) {
  const m = new model(req.body);

  m.save((err, docs)=>{
    if (err) {
      res.json(err);
      return;
    }
    res.json(docs).status(200);
  })
}
