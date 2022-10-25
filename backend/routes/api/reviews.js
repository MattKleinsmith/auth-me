const express = require('express');

const { setTokenCookie, requireAuthentication } = require('../../utils/auth');
const { Review, Spot, User, SpotImage, sequelize, ReviewImage } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

router.get('/current', requireAuthentication, async (req, res) => {
    const options = {
        include: [
            {
                model: User,
                attributes: ['id', 'firstName', 'lastName']
            },
            {
                model: Spot,
                attributes: [
                    "id", "ownerId", "address", "city", "state",
                    "country", "lat", "lng", "name", "price",
                    [sequelize.literal("`Spot->SpotImages`.`url`"), "previewImage"]
                ],
                include: {
                    model: SpotImage,
                    attributes: [],
                    where: { preview: true }
                },
            },
            {
                model: ReviewImage,
                attributes: ['id', 'url']
            },
        ],
        where: { userId: req.user.id },
    };
    const reviews = await Review.findAll(options);
    res.json({ Reviews: reviews });
});

module.exports = router;
