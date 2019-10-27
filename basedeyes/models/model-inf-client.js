const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const InfClienteSchema = new Schema({
    numero_cliente: {
        type: String,
        trim: true,
        required: [true, 'EL Numero de Cliente es Obligatorio!'],
        unique: 'Este numero de cliente ya Exsiste!'
    },
    name: {
        type: String,
        trim: true,
        required: [true, 'El Nombre de Cliente es Obligatorio!']
    },
    ip: {
        type: String,
        trim: true,
        required: [true, 'La Ip es Obligatoria!'],
        unique: 'Esta Ip ya esta Ocupada!'
    },
    model_cpe: { type: String, required: false },
    model_modem: { type: String, required: false },
    user_modem: { type: String, required: false },
    pass_modem: { type: String, required: false },
    wifi_modem: { type: String, required: false },
    usuario_cpe: { type: String, required: false },
    pass_cpe: { type: String, required: false },
    usuario_pppoe: { type: String, required: false },
    pass_pppoe: { type: String, required: false },
    zona: {
        type: String,
        trim: true,
        required: [true, 'Ingresar la Zona es Obligatorio!']
    }
})

module.exports = mongoose.model('InfClient', InfClienteSchema)
