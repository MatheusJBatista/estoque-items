module.exports = function (app,req,res,model) {
  var query = model.findOneAndUpdate({_id:req.body.id}, req.body);
  query.exec((err) => {
    if (err) {
      res.json(err);
    }
    res.sendStatus(200);
  })
};
