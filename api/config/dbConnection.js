const mongoose = require('mongoose');
const usuario = `admin`;
const password = `adminadmin1`;

module.exports.conexao = mongoose.connect(`mongodb://${usuario}:${password}@ds151070.mlab.com:51070/estoque-produtos`, {useNewUrlParser : true})
