const express = require("express")
const bcrypt = require("bcrypt");
const gerartoken = require("../utils/gerartoken")
const router = express.Router();
const Cliente = require("../models/cliente")
const config= require("../config/settings")


router.get("/",(req,res)=>{
    Cliente.find().then((result)=>{
        res.status(200).send({output:`Ok`,payload:result})
    }).catch((error)=>res.status(500).send({output:`Erro ao listar clientes`,err:error}))
})


router.post("/insert",(req,res)=>{

    bcrypt.hash(req.body.senha,config.bcrypt_salt,(err,cripto)=>{
        if(err){
            return res.status(500).send({output:`Erro ao processar o cadastro`,error:err})
        }

        req.body.senha = cripto

    const dados = new Cliente(req.body);
    dados.save().then((result)=>{
        res.status(201).send({output:`Cadastrado`,payload:result})
    }).catch((error)=>res.status(400).send({output:`Não foi possível cadastrar o cliente`,err:error}))
  })
})


router.post("/login",(req,res)=>{
    const us = req.body.nomeusuario
    const sh = req.body.senha

    Cliente.findOne({nomeusuario:us}).then((result)=>{
        if(!result){
            return res.status(404).send({output:`Usuário não existe`})
        }
        bcrypt.compare(sh,result.senha).then((rs)=>{
            if(!rs){
                return res.status(400).send({output:`Usuário ou senha incorreto`})
            }

            const token = gerartoken(result._id,result.nomeusuario,result.email)
            res.status(200).send({output:"Autenticado",token:token,user:result})
        })
        .catch((error)=>res.status(500).send({output:`Erro ao processar dados -> ${error}`}))
    }).catch((err)=>res.status(500).send({output:`Erro ao processar o login -> ${err}`}))
})


router.put("/changepassword/:id",(req, res)=>{

    bcrypt.hash(req.body.senha,config.bcrypt_salt,(err,cripto)=>{
        if(err){
            return res.status(500).send({output:`Erro ao atualizar a senha`,error:err})
        } 
        
        let newPassword = cripto

        Cliente.findByIdAndUpdate(req.params.id,{senha: newPassword},{new:true}).then((result)=>{
            if(!result){
                res.status(400).send({output:`Não foi possível localizar o usuário`})
            }
            res.status(200).send({ouptut:`Senha atualizada`,payload:result})
        }).catch((error)=>res.status(500).send({output:`Erro ao tentar atualizar a senha`,erro:error}))
    })
})

router.use((req,res)=>{
    res.type("application/json");
    res.status(404).send({mensagem:"404 - Not Found"})
})

module.exports = router;