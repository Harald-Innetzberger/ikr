require('dotenv').config();
const express = require('express');
const session = require('express-session');
// saving sessions to mongo db
const MongoDBStore = require('connect-mongodb-session')(session);
const connectDB = require('./config/db');
const cors = require('cors');
const path = require('path');
const PORT = process.env.PORT | 5000;
const IkrApiRoutes = require('./routes/api/ikr');
const UserApiRoutes = require('./routes/api/user');

// create express app
const app = express();

// session part
// https://blog.devgenius.io/mern-auth-with-session-part-2-session-with-mongodb-and-express-b185c17ad6f0
const MAX_COOKIE_AGE = 1000 * 60 * 60 * 24 // = 24 hours
const mongoDBStore = new MongoDBStore({
    uri: process.env.MONGO_URI,
    collection: 'mySessions'
  });
// Catch errors
mongoDBStore.on('error', function(error) {
    console.log(error);
  });

// use the session middleware of express
const sess = {
    secret: 'abc1234abc1234igel', 
    name: 'session',
    store: mongoDBStore, // to store session data on server db
    cookie: { // set cookie in client to compare with server
        maxAge: MAX_COOKIE_AGE,
        sameSite: false,
        secure: process.env === 'production' ? true : false,
    },
    resave: true,
    saveUninitialized: false
};
app.use(session(sess));

app.use(cors({
    credentials: true,
    optionsSuccessStatus: 200, // IE11 ...204 bug
}));

app.use(express.json());

connectDB(); // connect to mongo db via mongoose

// Bring in routers
app.use('/api/ikr', IkrApiRoutes);
app.use('/api/user', UserApiRoutes);

app.listen(PORT, () => {
    console.log(`Application running on port ${PORT} ...`);
});

// easier to use. run client from servers static folder ...
app.use(express.static(path.join(__dirname + "/public")));
