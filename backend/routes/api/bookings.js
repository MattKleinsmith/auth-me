const express = require('express');

const { requireAuthentication, respondWith403, respondWithSuccessfulDelete } = require('../../utils/auth');
const { Spot, Review, SpotImage, User, sequelize, ReviewImage, Booking } = require('../../db/models');
const { validateSpot, validateReview, validateBooking, analyzeErrors } = require('../api/validators.js');

const router = express.Router();

async function restoreBooking(req, res, next) {
    const booking = await Booking.findByPk(req.params.bookingId);
    if (booking) {
        req.booking = booking;
        return next();
    }
    respondWithBooking404(res);
}

function respondWithBooking404(res) {
    res.status(404).json({
        "message": "Booking couldn't be found",
        "statusCode": 404
    });
}

router.get('/current', requireAuthentication, async (req, res) => {
    const options = {
        include: [
            {
                model: Spot,
                attributes: { exclude: ['createdAt', 'updatedAt'] },
                include: { model: SpotImage, attributes: ['url'], where: { preview: true } },
            },
        ],
        where: { userId: req.user.id }
    };
    const bookings = await Booking.findAll(options);
    for (let i = 0; i < bookings.length; i++) {
        // TODO: Set up PG locally to find the right Sequelize syntax to avoid this loop
        const booking = bookings[i].toJSON();
        if (booking.Spot) {
            bookings[i] = booking;
            booking.Spot.previewImage = booking.Spot.SpotImages[0].url;
            delete booking.Spot.SpotImages;
        }
    }
    res.json({ Bookings: bookings });
});

router.put('/:bookingId', requireAuthentication, restoreBooking, validateBooking, async (req, res) => {
    if (req.user.id !== req.booking.userId) return respondWith403(res);

    if (new Date(req.booking.endDate) < new Date()) {
        return res.status(403).json({
            "message": "Past bookings can't be modified",
            "statusCode": 403
        });
    }
    analyzeErrors(req, res, async () => {
        const { startDate, endDate } = req.body;
        const record = await req.booking.update({ startDate, endDate });
        res.status(200).json(record);
    });
});

router.delete('/:bookingId', requireAuthentication, restoreBooking, async (req, res) => {
    if (req.user.id !== req.booking.userId) return respondWith403(res);
    if (new Date() > new Date(req.booking.startDate)) {
        return res.status(403).json(
            {
                "message": "Bookings that have been started can't be deleted",
                "statusCode": 403
            });
    }
    await req.booking.destroy();
    respondWithSuccessfulDelete(res);
});

module.exports = router;
