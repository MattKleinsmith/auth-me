const express = require('express');

const { setTokenCookie, requireAuthentication } = require('../../utils/auth');
const { getReviews } = require('../../utils');
const { Review, Spot, User, SpotImage, sequelize, ReviewImage } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const { environment } = require('../../config');
const isProduction = environment === 'production';

const router = express.Router();

router.get('/current', requireAuthentication, (req, res) => {
    getReviews(res, { userId: req.user.id });
});

module.exports = router;
