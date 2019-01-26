const dbConnection = require('../../config/dbConnection').conexao;
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var CategoriasSchema = new Schema({
  nome: {
    type: String,
    required:true
  },
  disponivel: {
    type: Boolean,
    required:true
  },
  data_criacao: {
    type: Date,
    default: Date.now()
  }
});

module.exports = mongoose.model('Categorias', CategoriasSchema);
