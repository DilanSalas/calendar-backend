const mongoose = require('mongoose');
const {Schema, model} = mongoose;

const UsuarioSchema = new Schema({
    googleId: {
        type: String,
        required: false,
        unique: true,
        default: null,

    },
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: false,
    },
});

module.exports = model('Usuario', UsuarioSchema);