const dotenv = require('dotenv').config();
const cookieSession = require('cookie-session');
const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const bodyParser = require('body-parser');
const PORT = process.env.PORT;
const IkrApiRoutes = require('./routes/api/ikr');
const UserApiRoutes = require('./routes/api/user');

const app = express();

app.use(cookieSession({
    name: 'session',
    keys: ['TESTSESSION'],
    secret: 'secret',
    resave: false,
    saveUnitialized: true,
    cookie: { secure: true },
    // Cookie opts
    maxAge: 24 * 60 * 60 * 1000 // = 24 Hours
}));

app.use(cors());
app.use(bodyParser.json());

connectDB();

app.use('/api/ikr', IkrApiRoutes);
app.use('/api/user', UserApiRoutes);

app.listen(PORT, () => {
    console.log(`Application running on port ${PORT} ...`);
})
