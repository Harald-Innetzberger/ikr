const { Router } = require('express');
const { User, validate } = require('../../models/User');

// Create router working object to use 
const router = Router();

// Register new user
router.post("/register", async (req, res) => {
    const { role } = req.session.user;
    if (role === 'admin') {
        // validate the request with joi
        const { error } = validate(req.body);
        if (error) {
            res.status(400).json({ message: error.message });
            } else {
            const user = new User(req.body);
            try {
                await user.save();
                res.status(201).json({ user });
            } catch (error) {
                res.status(400).json({ message: error.message });
            }
        }
    } else {
        res.status(403).json({ message: 'User role admin is required to register a new user.'})
    }
});

// Login user (with creating session)
router.post("/login", async (req, res) => {
    // validate the request with joi
    const { error } = validate(req.body);
        if (error) {
            res.status(400).json({ message: error.message });
            } else {
        try {
            const user = await User.findByCredentials(req.body.email, req.body.password);
            // create user session in mongo db and attach session object.
            const userSession = { email: user.email, role: user.role };
            req.session.user = userSession;
            res.send({ user });
        } catch (error) {
            res.status(400).send({ message: error.data });
        }
    }
});

// User is authenticated ...
router.get('/isAuth', async (req, res) => {
    if (req.session.user) {
        return res.json(req.session.user);
    } else {
        return res.status(401).json(null);
    }
});

// Logout user, destroy session
router.post("/logout", async (req, res) => {
    if (req.session.user) {
        req.session.destroy(); // server clean up, delete session
        res.clearCookie('session'); // client clean up, delete session cookie
        return res.json({ msg: 'logging you out ...' });
    } else {
        return res.json({ msg: 'no user to logout ...' });
    }
})

module.exports = router;

