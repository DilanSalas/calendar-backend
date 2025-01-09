
const {response} = require('express');

const getEventos = async(req,res = response)=>{

      //respuesta
    res.status(200).json(
    {
        ok:true,
        msg: 'get eventos'
       
    })
    
};

const crearEvento = async(req,res = response)=>{

    console.log(req.body);

    res.status(201).json(
        {
            ok:true,
            msg: 'evento creado'
           
        })
    
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