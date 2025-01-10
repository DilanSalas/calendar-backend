const {response} = require('express');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/Usuario');
const {generarJWT} = require('../helpers/jwt');

const crearUsuario = async(req,res = response)=>    
{

    const { email, password} = req.body; 
    try {
            let usuario = await Usuario.findOne({email});
            

                if(usuario){
                    res.status(400).json({ok: false, msg: 'El usuario ya existe'});
                    return;
                }
        
             usuario = new Usuario(req.body);

             //hash de contraseña
             const salt = bcrypt.genSaltSync();
             usuario.password = bcrypt.hashSync(password, salt);

             await usuario.save();

             //generar jwt
             const token = await generarJWT(usuario._id, usuario.name);
        
            res.status(201).json(
            {ok: true,
             uid: usuario._id,
             name: usuario.name,
             token: token,
             
            })
        
    } catch (error) {

        res.status(500).json({ok: false, msg: 'Hable con el administrador'})
        
    }

}

const loginUsuario = async(req,res = response)=>{

    const {email, password} = req.body; 

    try {
        const usuario = await Usuario.findOne({email});
            
        if(!usuario){
            res.status(400).json({ok: false, msg: 'El usuario no existe con ese email'});
            return;
        }


        const validPassword = bcrypt.compare(password, usuario.password);

        if(!validPassword){
            res.status(400).json({ok: false, msg: 'La contraseña es incorrecta'});
            return;
        }
        
        //generar token
        const token = await generarJWT(usuario._id, usuario.name);
        
        //respuesta
        res.json(
            {
            ok: true,
            uid: usuario._id,
            name: usuario.name,
            token
        })
        
    } catch (error) {
        
        res.status(500).json({ok: false, msg: 'Hable con el administrador'})
        
        
    }
    

}

const revalidarToken = async(req,res = response)=>{

    const uid = req.uid;
    const name = req.name;

    const token = await generarJWT(uid, name);


    res.json({ok: true,
        uid,
        token,
        name
    })

}

module.exports = {
    crearUsuario,
    loginUsuario,
    revalidarToken,
}