const express = require("express");
const router = express.Router();

const { check } = require('express-validator');

const { validarJWT } = require('../middlewares/validar-jwt');
const { getEventos, crearEvento, actualizarEvento, eliminarEvento } = require('../controllers/events');

router.use(validarJWT);

//obtener eventos
router.get('/' ,getEventos,)

//crear evento
router.post('/',crearEvento,)

//actualizar evento
router.put('/:id',actualizarEvento,)

//borrar evento
router.delete('/:id',eliminarEvento)

module.exports = router;