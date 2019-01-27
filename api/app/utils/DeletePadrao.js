module.exports = function (req,res,model) {
  var query = model.findOneAndDelete({_id:req.params.id});
  query.exec((err) => {
    if (err) {
      res.json(err);
      return;
    }
    res.sendStatus(200);
  })
};
