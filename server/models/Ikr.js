const { Schema, model } = require('mongoose');

const ikrSchema = new Schema({
    number: {
        type: Number,
        required: true
    },
    category: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
})

const Ikr = model('ikr', ikrSchema);

module.exports = Ikr;