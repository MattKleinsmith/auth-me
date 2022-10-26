const express = require('express');

const { requireAuthentication, respondWith403, respondWithSuccessfulDelete } = require('../../utils/auth');
const { Spot, Review, SpotImage, User, sequelize, ReviewImage, Booking } = require('../../db/models');

const router = express.Router();

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

module.exports = router;
