const dbConnection = require('../../config/dbConnection').conexao;
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var MarcasSchema = new Schema({
  nome: {
    type: String,
    required: 'Nome da marca é obrigatorio'
  },
  logo_url: {
    type: String
  },
  data_criacao: {
    type: Date,
    default: Date.now()
  }
})

module.exports = mongoose.model("Marcas", MarcasSchema);
