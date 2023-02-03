const dotenv = require('dotenv').config();
const express = require('express');
const session = require('express-session');
const { v4: uuidv4 } = require('uuid');
const connectDB = require('./config/db');
const cors = require('cors');
const bodyParser = require('body-parser');
const PORT = process.env.PORT;
const IkrApiRoutes = require('./routes/api/ikr');
const UserApiRoutes = require('./routes/api/user');
const path = require('path');

const app = express();

// use the session middleware of express
app.use(session({
    name: 'SessionCookie',
    genid: function(req) {
            return uuidv4();
    },
    secret: ['veryimportantsecret'], 
    resave: false,
    saveUninitialized: false,
    cookie: { 
        // secure: true,
        secure: false, // http enabled?
        httpOnly: true,
        maxAge: 600000,
    },
}));

// app.enable('trust proxy', 1);

app.use(cors({
    credentials: true,
}));

app.use(bodyParser.json());

connectDB();

app.use('/api/ikr', IkrApiRoutes);
app.use('/api/user', UserApiRoutes);

app.listen(process.env.PORT | PORT, () => {
    console.log(`Application running on port ${PORT} ...`);
});

// easier to use. run client from servers static folder ...
app.use(express.static(path.join(__dirname + "/public")));
