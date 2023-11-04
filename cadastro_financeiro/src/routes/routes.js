const express = require("express")
const verificarToken = require("../middleware/verificartoken")
const buscarCliente = require("../middleware/buscarcliente")
const router = express.Router();
const Financeiro = require("../models/financeiro")


router.get("/",(req,res)=>{
    Financeiro.find().then((result)=>{
        res.status(200).send({output:`Ok`,payload:result})
    }).catch((error)=>res.status(500).send({output:`Erro ao processar o pedido`,err:error}))
})


router.post("/insert/:id",verificarToken,buscarCliente,(req,res)=>{
    const financeiro = new Financeiro(req.body);
    financeiro.id_usuario = req.params.id
    financeiro.save().then((result)=>{
        res.status(201).send({output:`Dados financeiros cadastrados`,payload:result})
    }).catch((error)=>res.status(400).send({output:`Não foi possível cadastrar os dados financeiros`,err:error}))
})


router.put("/update/:id",verificarToken,(req, res)=>{

    Financeiro.findByIdAndUpdate(req.params.id,req.body,{new:true}).then((result)=>{
        if(!result){
            res.status(400).send({output:`Não foi possível localizar os dados financeiros`})
        }
        res.status(200).send({ouptut:`Atualizado`,payload:result})
    }).catch((error)=>res.status(500).send({output:`Erro ao tentar atualizar`,erro:error}))
})

router.delete("/delete/:id",verificarToken,(req,res)=>{
    
    Financeiro.findByIdAndDelete(req.params.id).then((result)=>{
        res.status(200).send({output:`Apagado`,payload:req.params.id})
    }).catch((error)=>res.status(500).send({output:`Erro ao tentar apagar`,erro:error}))
})

router.use((req,res)=>{
    res.type("application/json");
    res.status(404).send({mensagem:"404 - Not Found"})
})



module.exports = router;