const dotenv = require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const bodyParser = require('body-parser');
const PORT = process.env.PORT;
const IkrApiRoutes = require('./routes/api/ikr');

const app = express();

app.use(cors());
app.use(bodyParser.json());

connectDB();

app.use('/api/ikr', IkrApiRoutes);

app.listen(PORT, () => {
    console.log(`Application running on port ${PORT} ...`);
})
