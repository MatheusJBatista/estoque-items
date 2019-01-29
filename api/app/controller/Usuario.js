module.exports.get = (req,res) => {
  res.send([
    {
      nome: 'Matheus',
      usuario: 'API',
      conta: 'API'
    }
  ])
}
