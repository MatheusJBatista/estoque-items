const app = require('./config/server');
const port = 8080 || process.env.PORT;

const Categoria = require('./app/routes/categoria')(app);
const Marca = require('./app/routes/Marca')(app);
const Produto = require('./app/routes/Produto')(app);
const Usuario = require('./app/routes/Usuario')(app);

app.use((req,res,next) =>{
  res.status(404).json({error: 'url não encontrada(404)'});
  next();
})

app.listen(port,(req,res) => console.log(`Servidor rodando na porta: ${port}`));
