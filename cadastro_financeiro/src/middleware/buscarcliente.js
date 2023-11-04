const Cliente = require("../models/cliente")

function buscarCliente(req,res,next){

    const userId = req.params.id

    if(!userId){
        return res.status(401).send({output:`Id do usuário não informado`})
    }

    Cliente.findById(userId).then((result)=>{
        next();
    }).catch((error)=>res.status(400).send({output:`Usuário não encontrado`,err:error}))
}

module.exports = buscarCliente