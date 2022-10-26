const express = require('express');

const { requireAuthentication, respondWith403, respondWithSuccessfulDelete } = require('../../utils/auth');
const { Spot, Review, SpotImage, User, sequelize, ReviewImage, Booking } = require('../../db/models');

const { validateSpot, validateReview, analyzeErrors } = require('../api/validators.js');

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

router.post('/', requireAuthentication, validateSpot, async (req, res) => {
    analyzeErrors(req, res, async () => {
        const { address, city, state, country, lat, lng, name, description, price } = req.body;
        const record = await Spot.create({ ownerId: req.user.id, address, city, state, country, lat, lng, name, description, price });
        res.status(201).json(record);
    })
});

router.put('/:spotId', requireAuthentication, restoreSpot, requireSpotOwnership, validateSpot, async (req, res) => {
    analyzeErrors(req, res, async () => {
        const { address, city, state, country, lat, lng, name, description, price } = req.body;
        const spot = await req.spot.update({ ownerId: req.user.id, address, city, state, country, lat, lng, name, description, price });
        res.status(200).json(spot);
    })
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

router.post('/:spotId/reviews', requireAuthentication, restoreSpot, validateReview, async (req, res) => {
    const oldReview = await Review.findOne({ where: { userId: req.user.id, spotId: req.params.spotId } });
    if (oldReview) {
        return res.status(403).json({
            "message": "User already has a review for this spot",
            "statusCode": 403
        })
    }

    analyzeErrors(req, res, async () => {
        const { review, stars } = req.body;
        const record = await Review.create({ userId: req.user.id, spotId: req.params.spotId, review, stars });
        res.status(201).json(record);
    })
})

router.get('/:spotId/bookings', requireAuthentication, restoreSpot, async (req, res) => {
    const isOwner = req.user.id === req.spot.ownerId;

    if (isOwner) {
        const options = {
            where: { spotId: req.params.spotId },
            include: { model: Spot, include: { model: User, attributes: ['id', 'firstName', 'lastName'] } }
        };
        const bookings = await Booking.findAll(options);
        for (let i = 0; i < bookings.length; i++) {
            const booking = bookings[i].toJSON();
            if (booking.Spot) {
                bookings[i] = booking;
                booking.User = booking.Spot.User;
                delete booking.Spot;
            }
        }
        res.json({ Bookings: bookings });
    } else {
        const options = {
            where: { spotId: req.params.spotId },
            attributes: ['spotId', 'startDate', 'endDate']
        };
        const bookings = await Booking.findAll(options);
        for (let i = 0; i < bookings.length; i++) {
            const booking = bookings[i].toJSON();
            if (booking.Spot) {
                bookings[i] = booking;
                booking.User = booking.Spot.User;
                delete booking.Spot;
            }
        }
        res.json({ Bookings: bookings });
    }
});

module.exports = router;
