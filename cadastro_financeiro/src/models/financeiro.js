const mongoose = require("../database/conexao")

const schema = new mongoose.Schema({
    id_usuario:{type:String, unique:true, require:true},
    nome_banco:{type:String, require:true},
    tipo_conta:{type:String, enum:['PJ','PF'], require:true},
    nome_titular:{type:String, require:true},
    limite_cartao:{type:Number, require:true}
})

const Financeiro = mongoose.model("financeiro",schema)

module.exports = Financeiro