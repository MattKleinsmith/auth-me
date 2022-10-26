const express = require('express');

const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { User } = require('../../db/models');

const { check } = require('express-validator');
const { validateLogin, analyzeErrors } = require('../api/validators.js');

const router = express.Router();

// Log in
router.post('/', validateLogin, async (req, res, next) => {
    analyzeErrors(req, res, async () => {
        const { credential, password } = req.body;

        const user = await User.login({ credential, password });

        if (!user) {
            return res.status(401).json({
                "message": "Invalid credentials",
                "statusCode": 401
            })
        }

        setTokenCookie(res, user);

        return res.json({
            user
        });
    })
});

// Log out
router.delete('/', (_req, res) => {
    res.clearCookie('token');
    return res.json({ message: 'success' });
}
);

// Restore session user
router.get('/', restoreUser,
    (req, res) => {
        const { user } = req;
        if (user) {
            return res.json({
                user: user.toSafeObject()
            });
        } else return res.json({});
    }
);

module.exports = router;
