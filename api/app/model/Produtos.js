const dbConnection = require('../../config/dbConnection').conexao;
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var ProdutosSchema = new Schema({
  nome: {
    type: String,
    required: true
  },
  descricao: {
    type: String,
    required:true
  },
  preco: {
    type: Number,
    required:true
  },
  disponivel: {
    type: Boolean,
    required:true
  },
  url_foto: {
    type: String
  },
  detalhe: {
    type: String
  },
  data_inicio: {
    type: Date,
    default: Date.now()
  },
  categoria: {
    type: Schema.Types.ObjectId,
    ref: 'Categorias',
    required:true
  },
  marca: {
    type: Schema.Types.ObjectId,
    ref: 'Marcas',
    required:true
  }
})

module.exports = mongoose.model('Produtos', ProdutosSchema);
