const express = require('express');
const router = express.Router();
const passport = require('passport');
const { check } = require('express-validator');

// Controladores
const { crearUsuario, loginUsuario, revalidarToken, googleSignIn } = require('../controllers/auth');

// Middlewares
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

// Rutas tradicionales
router.post('/new', [
    check('name', 'El nombre es requerido').not().isEmpty(),
    check('email', 'El email es requerido').not().isEmpty(),
    check('email', 'El email debe ser válido').isEmail(),
    check('password', 'La contraseña es requerida').not().isEmpty(),
    check('password', 'La contraseña debe tener al menos 6 caracteres').isLength({ min: 6 }),
    validarCampos
], crearUsuario);

router.post('/', [
    check('email', 'El email es requerido').not().isEmpty(),
    check('email', 'El email debe ser válido').isEmail(),
    check('password', 'La contraseña es requerida').not().isEmpty(),
    check('password', 'La contraseña debe tener al menos 6 caracteres').isLength({ min: 6 }),
    validarCampos
], loginUsuario);

// ✔ Nueva ruta para autenticación Google desde el frontend (POST con JWT)
router.post('/google', googleSignIn);

// Renovar token
router.get('/renew', validarJWT, revalidarToken);



// Ruta protegida de prueba
router.get('/me', async (req, res) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ ok: false, msg: 'No token' });
    }

    try {
        const { uid, name } = await verificarJWT(token);
        res.json({ ok: true, uid, name, token });
    } catch (err) {
        res.status(401).json({ ok: false, msg: 'Token inválido' });
    }
});

module.exports = router;
