const { Schema, model } = require('mongoose');

const ikrSchema = new Schema({
    accountNumber: {
        type: Number,
        required: true
    },
    accountCategory: {
        type: Number,
        required: true
    },
    accountName: {
        type: String,
        required: true
    },
    accountDescription: {
        type: String,
        required: true
    }
})

const Ikr = model('ikr', ikrSchema);

module.exports = Ikr;