const { check, validationResult } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { Booking, sequelize } = require('../../db/models');
const { Op } = require("sequelize");

async function analyzeErrors(req, res, validHandler) {
    const errorObjects = validationResult(req);
    if (errorObjects.isEmpty()) {
        return await validHandler();
    }
    else {
        const errors = errorObjects.array().reduce((errors, errObj) => {
            errors[errObj.param] = errObj.msg;
            return errors;
        }, {});
        res.status(req.status || 400).json({
            message: req.message || "Validation Error",
            statusCode: req.status || 400,
            errors
        });
    }
}

const validateSignup = [
    check('email')
        .exists({ checkFalsy: true })
        .isEmail()
        .withMessage('Please provide a valid email.'),
    check('username')
        .exists({ checkFalsy: true })
        .isLength({ min: 4 })
        .withMessage('Please provide a username with at least 4 characters.'),
    check('username')
        .not()
        .isEmail()
        .withMessage('Username cannot be an email.'),
    check('firstName')
        .not()
        .isEmail()
        .withMessage('First name cannot be an email.'),
    check('lastName')
        .not()
        .isEmail()
        .withMessage('Last name cannot be an email.'),
    check('password')
        .exists({ checkFalsy: true })
        .isLength({ min: 6 })
        .withMessage('Password must be 6 characters or more.'),
    handleValidationErrors
];

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

const validateReview = [
    check('review')
        .exists({ checkFalsy: true })
        .withMessage('Review text is required'),
    check('stars')
        .isIn([1, 2, 3, 4, 5])
        .withMessage('Stars must be an integer from 1 to 5')
];

const validateBooking = [
    check('endDate')
        .custom((endDate, { req }) => {
            if (new Date(endDate) < new Date(req.body.startDate)) {
                throw new Error('endDate cannot be on or before startDate');
            } else {
                return endDate;
            }
        })
        .custom(async (endDate, { req }) => {
            const options = { where: {} };
            if (req.booking) {
                options.where.id = { [Op.not]: req.booking.id };
                options.spotId = req.booking.spotId;
            } else {
                options.spotId = req.params.spotId;
            }
            const bookings = await Booking.findAll(options);
            for (const booking of bookings) {
                if (new Date(endDate) >= new Date(booking.startDate) && new Date(endDate) <= new Date(booking.endDate)) {
                    req.message = "Sorry, this spot is already booked for the specified dates";
                    req.status = 403;
                    throw new Error("End date conflicts with an existing booking");
                }
            }
            return endDate;
        }),
    check('startDate')
        .custom(async (startDate, { req }) => {
            const options = { where: {} };
            if (req.booking) {
                options.where.id = { [Op.not]: req.booking.id };
                options.spotId = req.booking.spotId;
            } else {
                options.spotId = req.params.spotId;
            }
            const bookings = await Booking.findAll(options);
            for (const booking of bookings) {
                if (new Date(startDate) >= new Date(booking.startDate) && new Date(startDate) <= new Date(booking.endDate)) {
                    req.message = "Sorry, this spot is already booked for the specified dates";
                    req.status = 403;
                    throw new Error("Start date conflicts with an existing booking");
                }
            }
            return startDate;
        })
];

module.exports = {
    analyzeErrors,
    validateReview,
    validateSpot,
    validateSignup,
    validateBooking
}
