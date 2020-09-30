const express = require('express')
const bcrypt = require('bcrypt');
const _ = require('underscore');
const app = express()
const Usuario = require('../models/usuario');
app.get('/usuario', function (req, res) {

    let desde = req.query.desde || 0
    let limite = req.query.limite || 5
    desde = Number(desde);
    limite = Number(limite);

    Usuario.find({estado: true}, 'nombre email google estado role')
        .skip(desde)
        .limit(limite)
        .exec((err,usuarios)=>{
            if (err){
                return res.status(400).json({
                    ok: false,
                    err
                })
            }

            Usuario.countDocuments({estado: true}, (err, cuantos)=>{
                res.json({
                    ok: true,
                    usuarios,
                    cuantos
                })

            })


        })
//    res.json('get usuario local')

})

app.post('/usuario',  (req, res)=> {

    let body = req.body

    let usuario = new Usuario({
        nombre: body.nombre,
        email:body.email,
        password: bcrypt.hashSync(body.password,10),
        role: body.role
    })

    usuario.save((err, usuarioDB)=>{

        if (err){
            return res.status(400).json({
                ok: false,
                err
            })

        }

        res.json({
            ok: true,
            usuario: usuarioDB
        })

    })


})

app.put('/usuario/:id', function (req, res) {
    let id = req.params.id
    let body = _.pick(req.body,['nombre','email','img,role','estado']);


    Usuario.findByIdAndUpdate(id, body, {new: true, runValidators: true}, (err, usuarioDB) =>{
        if (err){
            return res.status(400).json({
                ok: false,
                err
            })

        }
        res.json({
            ok: true,
            usuario: usuarioDB
        })

    })


})

app.delete('/usuario/:id', function (req, res) {

    let id = req.params.id
    let cambiaestado = {
        estado: false
    }

    Usuario.findByIdAndUpdate(id, cambiaestado,{new: true}, (err, estadomodificado)=>{
        if (err){
            return res.status(400).json({
                ok: false,
                err
            })

        }
       //estadomodificado.estado = false
        res.json({
            ok: true,
            estadomodificado
        })

    })
    //ELIMINACION TOTAL DEL ARCHIVO:
    // Usuario.findByIdAndRemove(id, (err, usuarioborrado)=>{
    //     if (err){
    //         return res.status(400).json({
    //             ok: false,
    //             err
    //         })
    //
    //     }
    //
    //     if(!usuarioborrado){
    //         return res.status(400).json({
    //             ok: false,
    //             err:{
    //                 message: 'usuario no encontrado'
    //             }
    //         })
    //     }
    //     res.json({
    //         ok:true,
    //         usuarioborrado
    //     })

   //})

    //res.json('delete usuario')
})

module.exports = app;