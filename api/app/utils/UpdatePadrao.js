module.exports = function (req,res,model) {
  var query = model.findOneAndUpdate({_id:req.params.id}, req.body);
  query.exec((err, docs) => {
    if (err) {
      res.json(err);
      return;
    }
    res.sendStatus(200);
  })
};
