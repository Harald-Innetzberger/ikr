const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 4000;

// create a middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// init mongodb and start the server
app.listen(PORT, () => {
    mongoose.set('strictQuery', false);
    mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/test_db', { useNewUrlParser: true })
    .then((response) => {
        console.log(`Connected to MongoDB and Server started on Port ${PORT}`);
    }).catch((error) => {
        console.log(error);
    });
})
