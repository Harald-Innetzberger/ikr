const { Router } = require('express');
const { User, validate } = require('../../models/User');
const { route } = require('./ikr');

// Create router working object to use 
const router = Router();

// Register new user
router.post("/register", async (req, res) => {
    // validate the request
    const { error } = validate(req.body);
    if (error) {
        res.status(400).json({ message: error.message });
        } else {
        const user = new User(req.body);
        try {
            await user.save();
            const token = await user.generateAuthToken();
            res.status(201).json({ user, token });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
});

// Login user
router.post("/login", async (req, res) => {
    // validate the request
    const { error } = validate(req.body);
        if (error) {
            res.status(400).json({ message: error.message });
            } else {
        try {
            const user = await User.findByCredentials(req.body.email, req.body.password);
            const token = await user.generateAuthToken(); 
            res.send({ user, token });
            res.session.name = '12345678';
            console.log(req.session);
        } catch (error) {
            res.status(400).send({ message: error.data });
        }
    }
});

// Logout user
router.post("/logout", async (req, res) => {
    // req.session.destroy();
})

module.exports = router;

