const mongoose = require('mongoose');
const {Schema, model} = mongoose;

const EventoSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    notes: {
        type: String,
    },
    start: {
        type: Date,
        required: true,

    },
    end: {
        type: Date,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
    },
    
    
    
});

module.exports = model('Evento', EventoSchema);