const { Router } = require('express');
const { User, validate } = require('../../models/User');

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
    console.log(req.session);
    // validate the request
    const { error } = validate(req.body);
        if (error) {
            res.status(400).json({ message: error.message });
            } else {
        try {
            const user = await User.findByCredentials(req.body.email, req.body.password);
            const token = await user.generateAuthToken();
            const cookie = 
            res.send({ user, token });
        } catch (error) {
            res.status(400).send({ message: error.data });
        }
    }
});

// Get User Details
router.get("/me", async (req, res) => {
    console.log('me');
})

module.exports = router;

