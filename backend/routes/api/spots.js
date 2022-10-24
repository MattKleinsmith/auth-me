const express = require('express');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Spot, Review, SpotImage, sequelize } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const jwt = require('jsonwebtoken');

const router = express.Router();

async function getSpots(currentUserId) {
    const options = { include: [SpotImage, Review], where: {} };
    if (currentUserId) options.where.ownerId = currentUserId;
    const spots = await Spot.findAll(options);

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
    return spots;
}

router.get('/current', async (req, res) => {
    const currentUserId = jwt.decode(req.cookies.token).data.id;
    res.json(await getSpots(currentUserId));
})

router.get('/', async (req, res) => {
    res.json(await getSpots());
})

module.exports = router;
