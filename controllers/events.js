
const {response} = require('express');

const Evento = require('../models/Evento'); 

const getEventos = async(req,res = response)=>{

    const eventos = await Evento.find()
                                .populate('user','name');



   
    //respuesta
    res.status(200).json(
    {
        ok:true,
        eventos
       
    })
    
};

const crearEvento = async(req,res = response)=>{

    const evento = new Evento(req.body);

    try {

        evento.user = req.uid;

        const eventoGuardado = await evento.save();
        res.status(201).json(
            {
                ok:true,
                evento: eventoGuardado
               
            })
        
    } catch (error) {
        res.status(500).json({ok: false, msg: 'Hable con el administrador'})
        
    }

    
};

const actualizarEvento = async(req,res = response)=>{

    res.status(201).json(
        {
            ok:true,
            msg: 'evento actualizadp'
           
        })
    
};

const eliminarEvento = async(req,res = response)=>{
    res.status(200).json(
        {
            ok:true,
            msg: 'evento eliminado'
           
        })
    
};

module.exports = {
    getEventos,
    crearEvento,
    actualizarEvento,
    eliminarEvento
};