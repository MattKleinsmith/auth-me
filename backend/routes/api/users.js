const express = require('express');
const { setTokenCookie } = require('../../utils/auth');
const { User } = require('../../db/models');
const { validateSignup, analyzeErrors } = require('../api/validators.js');

const router = express.Router();

router.post('/', validateSignup, async (req, res) => {
    analyzeErrors(req, res, async () => {
        const { email, password, username, firstName, lastName } = req.body;
        const user = await User.signup({ email, username, password, firstName, lastName });

        setTokenCookie(res, user);

        return res.json({
            user
        });
    })
});

module.exports = router;
