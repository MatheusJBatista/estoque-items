module.exports = function (app,req,res,model) {
  const m = new model(req.body);

  m.save((err)=>{
    if (err) {
      res.json(err);
    }
    res.sendStatus(200);
  })
}
