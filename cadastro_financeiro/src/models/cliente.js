const mongoose = require("../database/conexao")

const schema = new mongoose.Schema({
    nomeusuario:{type:String, require:true},
    email:{type:String, unique:true, require:true},
    senha:{type:String, require:true},
    nomecompleto:{type:String, unique: true, require:true},
    telefone:{type:String},
    datacadastro:{type:Date, default:Date.now}
})

const Cliente = mongoose.model("cliente",schema)

module.exports = Cliente