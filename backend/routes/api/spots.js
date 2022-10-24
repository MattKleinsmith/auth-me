const express = require('express');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Spot, Review, SpotImage, User, sequelize } = require('../../db/models');

const { check, validationResult } = require('express-validator');
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
    res.json(await getSpots({ currentUserId: req.user.id }));
});

router.get('/', async (req, res) => {
    res.json(await getSpots());
});

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
});

const validateSpotCreation = [
    check('address')
        .exists({ checkFalsy: true })
        .withMessage('Street address is required'),
    check('city')
        .exists({ checkFalsy: true })
        .withMessage('City is required'),
    check('state')
        .exists({ checkFalsy: true })
        .withMessage('State is required'),
    check('country')
        .exists({ checkFalsy: true })
        .withMessage('Country is required'),
    check('lat')
        .exists({ checkFalsy: true })
        .withMessage('Latitude is not valid'),
    check('lng')
        .exists({ checkFalsy: true })
        .withMessage('Longitude is required'),
    check('name')
        .exists({ checkFalsy: true })
        .withMessage('Name is required')
        .isLength({ max: 49 })
        .withMessage('Name must be less than 50 characters'),
    check('description')
        .exists({ checkFalsy: true })
        .withMessage('Description is required'),
    check('price')
        .exists({ checkFalsy: true })
        .withMessage('Price per day is required'),
];

router.post('/', requireAuth, validateSpotCreation, async (req, res) => {
    const errorObjects = validationResult(req);
    if (errorObjects.isEmpty()) {
        const { address, city, state, country, lat, lng, name, description, price } = req.body;
        const spot = await Spot.create({ ownerId: req.user.id, address, city, state, country, lat, lng, name, description, price });
        res.status(201).json(spot);
    }
    else {
        const errors = errorObjects.array().reduce((errors, errObj) => {
            errors[errObj.param] = errObj.msg;
            return errors;
        }, {});
        res.status(400).json({
            message: "Validation Error",
            statusCode: 400,
            errors
        });
    }
});

module.exports = router;
