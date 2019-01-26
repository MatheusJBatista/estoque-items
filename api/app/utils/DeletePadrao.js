module.exports = function (app,req,res,model) {
  var query = model.findOneAndDelete(req.body.id);
  query.exec((err) => {
    if (err) {
      res.json(err);
    }
    res.sendStatus(200);
  })
};
