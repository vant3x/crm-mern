const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const usuariosSchema = new Schema({
    nombre: {
        type: String,
        required: 'Agrega tu Nombre',
        trim: true,
    },
    apellido: {
        type: String,
        required: false,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    },
    rol: {
        type: Number,
        default: 0
        
    },
    fecha_creacion: {
        type: Date,
        default: Date.now
    },
    fecha_ultimo_ingreso: {
        type: Date
    },
    estado: {
        type: Number,
        default: 0
    }
});

module.exports = mongoose.model('Usuarios', usuariosSchema);