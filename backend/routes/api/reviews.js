const express = require('express');

const { setTokenCookie, requireAuthentication } = require('../../utils/auth');
const { Review, Spot, User, SpotImage, sequelize, ReviewImage } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const { environment } = require('../../config');
const isProduction = environment === 'production';

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
                    "country", "lat", "lng", "name", "price"
                ],
                include: {
                    model: SpotImage,
                    attributes: ['url'],
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
    for (let i = 0; i < reviews.length; i++) {
        // TODO: Setup PG locally to find the right Sequelize syntax to avoid this loop
        const review = reviews[i].toJSON();
        reviews[i] = review;
        review.Spot.previewImage = review.Spot.SpotImages[0].url;
        delete review.Spot.SpotImages;
    }
    res.json({ Reviews: reviews });
});

module.exports = router;
