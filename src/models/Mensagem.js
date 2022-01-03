const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Mensagem = new Schema({
    data:{
        type: Date,
        default: Date.now()
    },
    texto:{
        type: String,
        required: true,
    },
    autor:{
        id:{
            type: Number,
            required: true
        },
        nome:{
            type: Number,
            required: true
        },
        nivel:{
            type: Number,
            required: true,
        },
        quantidae_exercicios_feitos:{
            type: Number,
            required: true
        },
        foto:{
            type: Buffer
        }
    }
})

mongoose.model("mensagens", Mensagem);

module.exports = mongoose.model("mensagens");