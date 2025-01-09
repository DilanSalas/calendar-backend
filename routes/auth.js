const express = require('express');
const router = express.Router()

const { crearUsuario, loginUsuario, revalidarToken } = require('../controllers/auth');
const { check } = require('express-validator');
const { validarJWT } = require('../middlewares/validar-jwt');


const { validarCampos } = require('../middlewares/validar-campos');
router.post('/new',
    [
        check('name', 'El nombre es requerido').not().isEmpty(),
        
        check('email', 'El email es requerido').not().isEmpty(),
        check('email', 'El email debe ser valido').isEmail(),
        
        check('password', 'La contraseña es requerida').not().isEmpty(),
        check('password', 'La contraseña debe tener al menos 6 caracteres').isLength({min: 6}),
        validarCampos




    ], 
    crearUsuario);

router.post('/',
    [
        check('email', 'El email es requerido').not().isEmpty(),
        check('email', 'El email debe ser valido').isEmail(),

        check('password', 'La contraseña es requerida').not().isEmpty(),
        check('password', 'La contraseña debe tener al menos 6 caracteres').isLength({min: 6}),

        validarCampos


    ],
    loginUsuario);

router.get('/renew',validarJWT, revalidarToken);
module.exports = router;
