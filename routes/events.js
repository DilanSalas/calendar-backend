const express = require("express");
const router = express.Router();

const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const { validarJWT } = require('../middlewares/validar-jwt');
const { getEventos, crearEvento, actualizarEvento, eliminarEvento } = require('../controllers/events');

const {isDate} = require('../helpers/isDate');

router.use(validarJWT);

//obtener eventos
router.get('/' ,getEventos,)

//crear evento
router.post('/',[
    check('title', 'El titulo es requerido').not().isEmpty(),
    check('start', 'La fecha de inicio es requerida').custom(isDate),
    check('end', 'La fecha de fin es requerida').custom(isDate),

    validarCampos

],crearEvento,)

//actualizar evento
router.put('/:id',actualizarEvento,)

//borrar evento
router.delete('/:id',eliminarEvento)

module.exports = router;