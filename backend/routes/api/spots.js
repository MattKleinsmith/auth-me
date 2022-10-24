const express = require('express');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Spot, Review, SpotImage, User, sequelize } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const jwt = require('jsonwebtoken');

const router = express.Router();

async function getSpots(args) {
    const options = { include: [SpotImage, Review], where: {} };
    if (args.currentUserId) options.where.ownerId = args.currentUserId;
    if (args.id) options.where.id = args.id;
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
    res.json(await getSpots({ currentUserId }));
})

router.get('/', async (req, res) => {
    res.json(await getSpots());
})

router.get('/:spotId', async (req, res) => {
    const options = {
        include: [{
            model: SpotImage,
            attributes: ['id', 'url', 'preview']
        }, {
            model: User,
            attributes: ['id', 'firstName', 'lastName']
        }, Review], where: {}
    };
    let spot = await Spot.findByPk(req.params.spotId, options);
    if (spot) {
        spot = spot.toJSON();

        spot.numReviews = spot.Reviews.length;
        spot.avgStarRating = spot.Reviews.reduce((sum, review) => sum + review.stars, 0) / spot.Reviews.length;
        delete spot.Reviews;

        spot.Owner = spot.User;
        delete spot.User;

        res.json(spot);
    }
    else {
        res.status(404).json({
            "message": "Spot couldn't be found",
            "statusCode": 404
        });
    }
})

module.exports = router;
