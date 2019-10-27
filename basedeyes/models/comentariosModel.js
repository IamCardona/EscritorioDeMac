const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Comentarios = new Schema({
    encabezado: {
        type: String,
        required: [true, 'Tienes que agregar un Encabezado!']
    },
    comentario: {
        type: String,
        required: [true, 'Tienes que agregar un cuerpo a tu comentario!']
    },
    status: {
        type: String
    }
})

module.exports = mongoose.model('comentModel', Comentarios)