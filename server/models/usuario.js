
const mongoose = require('mongoose');
const UniqueValidator = require('mongoose-unique-validator');

let Schema = mongoose.Schema

let rolesvalidos = {
    values: ['ADMIN_ROLE', 'USER_ROLE'],
    message: '{VALUE} no es un rol valido'
}

let usuarioSchema;
usuarioSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'el nombre es necesario']
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'el correo es necesario']
    },
    password: {
        type: String,
        required: [true, 'la contraseña es necesaria']
    },
    img: {
        require: false,
        type: String
    },
    role: {
        type: String,
        default: 'USER_ROLE',
        enum: rolesvalidos
    },
    estado: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    }
});

usuarioSchema.methods.toJSON= function(){

    let user = this;
    let userobject = user.toObject();
    delete userobject.password

    return userobject;
}

usuarioSchema.plugin(UniqueValidator,{message:'{PATH} debe ser unico'});

module.exports = mongoose.model('Usuario', usuarioSchema);
