const express = require('express');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Spot, Review, SpotImage, sequelize } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

router.get('/', async (req, res) => {

    // Doesn't work, because Sequelize doesn't include spots without ratings, nor spots without preview images.
    // const spots = await Spot.findAll({
    //     attributes: [
    //         "id", "ownerId", "address", "city", "state", "country", "lat", "lng",
    //         "name", "description", "price", "createdAt", "updatedAt",
    //         [sequelize.col('SpotImages.url'), "previewImg"],
    //         [sequelize.fn('AVG', sequelize.col('Reviews.stars')), 'avgRating']
    //     ],
    //     include: [
    //         { model: SpotImage, attributes: [], where: { preview: true } },
    //         { model: Review, attributes: [] }
    //     ]
    // });

    const spots = await Spot.findAll({ include: [SpotImage, Review] });

    for (let i = 0; i < spots.length; i++) {
        const spot = spots[i].toJSON();
        spots[i] = spot;
        spot.previewUrl = null;
        spot.avgReview = null;

        for (const spotImage of spot.SpotImages) {
            if (spotImage.preview) {
                spot.previewUrl = spotImage.url;
                break;
            }
        }

        if (spot.Reviews.length > 0) {
            spot.avgReview = spot.Reviews.reduce((sum, review) => sum + review.stars, 0) / spot.Reviews.length;
        }

        delete spot.SpotImages;
        delete spot.Reviews;
    }

    res.json(spots);
})

module.exports = router;
