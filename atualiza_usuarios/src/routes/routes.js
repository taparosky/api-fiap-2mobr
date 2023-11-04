const express = require("express")
const bcrypt = require("bcrypt");
const verificarToken = require("../middleware/verificartoken")
const router = express.Router();
const Cliente = require("../models/cliente")
const config= require("../config/settings")


router.get("/",(req,res)=>{
    Cliente.find().then((result)=>{
        res.status(200).send({output:`Ok`,payload:result})
    }).catch((error)=>res.status(500).send({output:`Erro ao listar clientes`,err:error}))
})


router.post("/insert",verificarToken,(req,res)=>{

    bcrypt.hash(req.body.senha,config.bcrypt_salt,(err,cripto)=>{
        if(err){
            return res.status(500).send({output:`Erro ao processar o cadastro`,error:err})
        }

        req.body.senha = cripto

    const dados = new Cliente(req.body);
    dados.save().then((result)=>{
        res.status(201).send({output:`Cadastrado`,payload:result})
    }).catch((error)=>res.status(400).send({output:`Não foi possível cadastrar`,err:error}))
  })
})


router.put("/update/:id",verificarToken,(req, res)=>{

    Cliente.findByIdAndUpdate(req.params.id,req.body,{new:true}).then((result)=>{
        if(!result){
            res.status(400).send({output:`Não foi possível localizar`})
        }
        res.status(200).send({ouptut:`Atualizado`,payload:result})
    }).catch((error)=>res.status(500).send({output:`Erro ao tentar atualizar o cliente`,erro:error}))
})

router.delete("/delete/:id",verificarToken,(req,res)=>{

    Cliente.findByIdAndDelete(req.params.id).then((result)=>{
        res.status(200).send({output:`Apagado`,payload:req.params.id})
    }).catch((error)=>res.status(500).send({output:`Erro ao tentar apagar o cliente`,erro:error}))
})

router.use((req,res)=>{
    res.type("application/json");
    res.status(404).send({mensagem:"404 - Not Found"})
})



module.exports = router;