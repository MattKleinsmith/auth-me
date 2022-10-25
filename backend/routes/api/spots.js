const express = require('express');

const { setTokenCookie, requireAuthentication, respondWith403, respondWithSuccessfulDelete } = require('../../utils/auth');
const { Spot, Review, SpotImage, User, sequelize } = require('../../db/models');

const { check, validationResult } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const jwt = require('jsonwebtoken');

const router = express.Router();

async function getSpots(currentUserId) {
    const options = {
        attributes: {
            include: [
                [sequelize.col('SpotImages.url'), 'previewImage'],
                [sequelize.fn('ROUND', sequelize.fn('AVG', sequelize.col('stars')), 1), 'avgRating']
            ]
        },
        include: [
            {
                model: SpotImage,
                where: { preview: true },
                attributes: [],
                required: false,
            },
            {
                model: Review,
                attributes: [],
                required: false
            },
        ],
        group: ['Spot.id', [sequelize.col('SpotImages.url'), 'previewImage']],
        where: {}
    }
    if (currentUserId !== undefined) options.where.ownerId = currentUserId;
    return await Spot.findAll(options);
}

router.get('/', async (req, res) => {
    res.json({ Spots: await getSpots() });
});

router.get('/current', async (req, res) => {
    res.json({ Spots: await getSpots(req.user.id) });
});

const validateSpot = [
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

router.post('/', requireAuthentication, validateSpot, async (req, res) => {
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

router.put('/:spotId', requireAuthentication, restoreSpot, requireOwnership, validateSpot, async (req, res) => {
    const errorObjects = validationResult(req);
    if (!errorObjects.isEmpty()) {
        const errors = errorObjects.array().reduce((errors, errObj) => {
            errors[errObj.param] = errObj.msg;
            return errors;
        }, {});
        return res.status(400).json({
            message: "Validation Error",
            statusCode: 400,
            errors
        });
    }

    const { address, city, state, country, lat, lng, name, description, price } = req.body;
    const spot = await req.spot.update({ ownerId: req.user.id, address, city, state, country, lat, lng, name, description, price });
    res.status(200).json(spot);
});

router.get('/:spotId', async (req, res) => {
    const options = {
        include: [
            {
                model: SpotImage,
                attributes: ['id', 'url', 'preview']
            },
            {
                model: User,
                attributes: ['id', 'firstName', 'lastName']
            },
            Review]
    };
    let spot = await Spot.findByPk(req.params.spotId, options);
    if (!spot) return respondWithSpot404(res);

    spot = spot.toJSON();
    spot.numReviews = spot.Reviews.length;
    spot.avgStarRating = spot.Reviews.reduce((sum, review) => sum + review.stars, 0) / spot.Reviews.length;
    delete spot.Reviews;

    spot.Owner = spot.User;
    delete spot.User;

    res.json(spot);
});

router.post('/:spotId/images', requireAuthentication, restoreSpot, requireOwnership, async (req, res) => {
    const { url, preview } = req.body;
    const spot = req.spot;

    let image = await SpotImage.create({ spotId: spot.id, url, preview });
    image = image.toJSON();
    delete image.createdAt;
    delete image.updatedAt;
    res.json(image);
});

router.delete('/:spotId', requireAuthentication, restoreSpot, requireOwnership, async (req, res) => {
    await req.spot.destroy();
    respondWithSuccessfulDelete(res);
});

async function restoreSpot(req, res, next) {
    const spot = await Spot.findByPk(req.params.spotId);
    if (spot) {
        req.spot = spot;
        return next();
    }
    respondWithSpot404(res);
}

function respondWithSpot404(res) {
    res.status(404).json({
        "message": "Spot couldn't be found",
        "statusCode": 404
    });
}

async function requireOwnership(req, res, next) {
    if (req.user.id === req.spot.ownerId) return next();
    respondWith403(res);
}

module.exports = router;
