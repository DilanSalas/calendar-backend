
const {response} = require('express');

const Evento = require('../models/Evento'); 

const getEventos = async (req, res = response) => {
    try {
        const eventos = await Evento.find({ user: req.uid })
                                    .populate('user', 'name');

        res.status(200).json({
            ok: true,
            eventos
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error al obtener los eventos'
        });
    }
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

    const eventoId = req.params.id

    try {

        const evento = await Evento.findById(eventoId);

        if(!evento){
            res.status(404).json({ok: false, msg: 'El evento no existe'});
            return;
        }

        if(evento.user._id.toString() !== req.uid){
            res.status(401).json({ok: false, msg: 'No tienes permisos para editar este evento'});
            return;
        }

        const nuevoEvento = {
            ...req.body,
            user: req.uid
        }
        
        const eventoActualizado = await Evento.findByIdAndUpdate(eventoId, nuevoEvento, {new: true});

        

        res.status(201).json(
            {
                ok:true,
                eventoActualizado
               
            })
    } catch (error) {
        res.status(500).json({ok: false, msg: 'Hable con el administrador'})
        
    }

    
};

const eliminarEvento = async(req,res = response)=>{

    const eventoId = req.params.id

    try {

        const evento = await Evento.findById(eventoId);

        if(!evento){
            res.status(404).json({ok: false, msg: 'El evento no existe'});
            return;
        }

        if(evento.user._id.toString() !== req.uid){
            res.status(401).json({ok: false, msg: 'No tienes permisos para eliminar este evento'});
            return;
        }

        const eventoEliminado = await Evento.findByIdAndDelete(eventoId);
            res.status(200).json(
                {
                    ok:true,
                    msg: 'evento eliminado',
                    eventoEliminado
                
                })
            

    } catch (error) {
        res.status(500).json({ok: false, msg: 'Hable con el administrador'})
        
    }
};

module.exports = {
    getEventos,
    crearEvento,
    actualizarEvento,
    eliminarEvento
};