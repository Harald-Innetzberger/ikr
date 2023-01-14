const { default: mongoose } = require("mongoose");

const Schema = mongoose.Schema;

const ikrSchema = new Schema({
    title: String,
    description: String
});

const Ikr = mongoose.model('Ikr', ikrSchema);