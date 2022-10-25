const express = require('express');

const { setTokenCookie, requireAuthentication, respondWith403, respondWithSuccessfulDelete } = require('../../utils/auth');
const { Spot, Review, SpotImage, User, sequelize, ReviewImage } = require('../../db/models');
const { getReviews } = require('../../utils');

const { check, validationResult } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const jwt = require('jsonwebtoken');

const router = express.Router();

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

async function requireSpotOwnership(req, res, next) {
    if (req.user.id === req.spot.ownerId) return next();
    respondWith403(res);
}

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

async function validatePost(req, res, createCb) {
    const errorObjects = validationResult(req);
    if (errorObjects.isEmpty()) {
        const record = await createCb(req);
        res.status(201).json(record);
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
}

router.post('/', requireAuthentication, validateSpot, async (req, res) => {
    validatePost(req, res, async (req) => {
        const { address, city, state, country, lat, lng, name, description, price } = req.body;
        return await Spot.create({ ownerId: req.user.id, address, city, state, country, lat, lng, name, description, price });
    })
});

router.put('/:spotId', requireAuthentication, restoreSpot, requireSpotOwnership, validateSpot, async (req, res) => {
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

router.post('/:spotId/images', requireAuthentication, restoreSpot, requireSpotOwnership, async (req, res) => {
    const { url, preview } = req.body;
    const spot = req.spot;

    let image = await SpotImage.create({ spotId: spot.id, url, preview });
    image = image.toJSON();
    delete image.createdAt;
    delete image.updatedAt;
    res.json(image);
});

router.delete('/:spotId', requireAuthentication, restoreSpot, requireSpotOwnership, async (req, res) => {
    await req.spot.destroy();
    respondWithSuccessfulDelete(res);
});

router.get('/:spotId/reviews', async (req, res) => {
    const options = {
        include: [
            {
                model: User,
                attributes: ['id', 'firstName', 'lastName']
            },
            {
                model: ReviewImage,
                attributes: ['id', 'url']
            },
        ],
        where: { spotId: req.params.spotId }
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

const validateReview = [
    check('review')
        .exists({ checkFalsy: true })
        .withMessage('Review text is required'),
    check('stars')
        .isIn([1, 2, 3, 4, 5])
        .withMessage('Stars must be an integer from 1 to 5')
];

router.post('/:spotId/reviews', requireAuthentication, restoreSpot, validateReview, async (req, res) => {
    const oldReview = await Review.findOne({ where: { userId: req.user.id, spotId: req.params.spotId } });
    if (oldReview) {
        return res.status(403).json({
            "message": "User already has a review for this spot",
            "statusCode": 403
        })
    }

    validatePost(req, res, async (req) => {
        const { review, stars } = req.body;
        return await Review.create({ userId: req.user.id, spotId: req.params.spotId, review, stars });
    })
})

module.exports = router;
