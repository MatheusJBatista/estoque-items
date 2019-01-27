const dbConnection = require('../../config/dbConnection').conexao;
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var ProdutosSchema = new Schema({
  nome: {
    type: String,
    required: 'Nome é obrigatorio'
  },
  descricao: {
    type: String,
    required: 'Descrição é obrigatorio'
  },
  preco: {
    type: Number,
    required: 'Preço é obrigatorio'
  },
  disponivel: {
    type: Boolean,
    required: '\'Disponivel\' é obrigatorio'
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
    required: 'Categoria é obrigatorio'
  },
  marca: {
    type: Schema.Types.ObjectId,
    ref: 'Marcas',
    required: 'Marca é obrigatorio'
  }
})

module.exports = mongoose.model('Produtos', ProdutosSchema);
