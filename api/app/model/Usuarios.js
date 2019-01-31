const dbConnection = require('../../config/dbConnection');
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UsuariosSchema = new Schema({
  nome: {
    type: String,
    required: 'nome é obrigatorio'
  },
  senha: {
    type: String,
    required: 'senha é obrigatorio'
  },
  usuario: {
    type: String,
    required: 'usuario é obrigatorio'
  },
  conta: {
    nome: {
      type: String,
      default: 'Comum'
    },
    admin: {
      type: Boolean,
      default: false
    }
  }
});

module.exports = mongoose.model('Usuarios', UsuariosSchema);
