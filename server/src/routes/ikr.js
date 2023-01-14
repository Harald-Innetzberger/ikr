const app = require('express');
import Ikr from '../schema/ikr';

app.get('/api/ikr', async (req, res, next) => {
    const ikrs = await Ikr.find();
    return res.json(ikrs);
});