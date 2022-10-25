const express = require('express');

const { setTokenCookie, requireAuthentication, respondWith403 } = require('../../utils/auth');
const { getReviews } = require('../../utils');
const { Review, Spot, User, SpotImage, sequelize, ReviewImage } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const { environment } = require('../../config');
const isProduction = environment === 'production';

const router = express.Router();

router.post('/:reviewId/images', requireAuthentication, async (req, res) => {
    const reviewRecord = await Review.findOne({ where: { id: req.params.reviewId } });
    if (!reviewRecord) {
        return res.status(404).json({
            "message": "Review couldn't be found",
            "statusCode": 404
        });
    }
    if (reviewRecord.userId != req.user.id) {
        return respondWith403(res);
    }
    const imageCount = await ReviewImage.count({ where: { reviewId: req.params.reviewId } });
    if (imageCount >= 10) {
        return res.status(403).json({
            "message": "Maximum number of images for this resource was reached",
            "statusCode": 403
        });
    }

    const imageRecord = await ReviewImage.create({ reviewId: req.params.reviewId, url: req.body.url });
    res.json(imageRecord);
});

router.get('/current', requireAuthentication, async (req, res) => {
    const options = {
        include: [
            {
                model: User,
                attributes: ['id', 'firstName', 'lastName']
            },
            {
                model: Spot,
                attributes: {
                    exclude: ['createdAt', 'updatedAt']
                },
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
        where: { userId: req.user.id }
    };
    const reviews = await Review.findAll(options);
    for (let i = 0; i < reviews.length; i++) {
        // TODO: Setup PG locally to find the right Sequelize syntax to avoid this loop
        const review = reviews[i].toJSON();
        if (review.Spot) {
            reviews[i] = review;
            review.Spot.previewImage = review.Spot.SpotImages[0].url;
            delete review.Spot.SpotImages;
        }
    }
    res.json({ Reviews: reviews });
});

module.exports = router;
