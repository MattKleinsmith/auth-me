'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Reviews', [
      {
        userId: 1,
        spotId: 2,
        "review": "This was a great spot!",
        "stars": 5
      },
      {
        userId: 5,
        spotId: 1,
        "review": "This was a good spot!",
        "stars": 5.0
      },
      {
        userId: 6,
        spotId: 1,
        "review": "This was a good spot!",
        "stars": 5.0
      },
      {
        userId: 7,
        spotId: 1,
        "review": "This was a good spot!",
        "stars": 5.0
      },
      {
        userId: 8,
        spotId: 1,
        "review": "This was a good spot!",
        "stars": 5.0
      },
      {
        userId: 9,
        spotId: 1,
        "review": "This was a good spot!",
        "stars": 5.0
      },
      {
        userId: 10,
        spotId: 1,
        "review": "This was a good spot!",
        "stars": 5.0
      },
      {
        userId: 11,
        spotId: 1,
        "review": "This was a good spot!",
        "stars": 5.0
      },
      {
        userId: 12,
        spotId: 1,
        "review": "This was a good spot!",
        "stars": 4
      },
      {
        userId: 1,
        spotId: 3,
        "review": "This was a good spot!",
        "stars": 5.0
      },
      {
        userId: 2,
        spotId: 3,
        "review": "This was a good spot!",
        "stars": 5.0
      },
      {
        userId: 4,
        spotId: 3,
        "review": "This was a good spot!",
        "stars": 5.0
      },
      {
        userId: 5,
        spotId: 3,
        "review": "This was a good spot!",
        "stars": 5.0
      },
      {
        userId: 6,
        spotId: 3,
        "review": "This was a good spot!",
        "stars": 4.0
      },
      {
        userId: 1,
        spotId: 4,
        "review": "This was a good spot!",
        "stars": 5
      },
      {
        userId: 1,
        spotId: 5,
        "review": "This was a good spot!",
        "stars": 5
      },
      {
        userId: 1,
        spotId: 6,
        "review": "This was a good spot!",
        "stars": 5
      },
      {
        userId: 1,
        spotId: 7,
        "review": "This was a good spot!",
        "stars": 5
      },
      {
        userId: 1,
        spotId: 8,
        "review": "This was a good spot!",
        "stars": 5
      },
      {
        userId: 1,
        spotId: 9,
        "review": "This was a good spot!",
        "stars": 5
      },
      {
        userId: 1,
        spotId: 10,
        "review": "This was a good spot!",
        "stars": 5
      },
      {
        userId: 1,
        spotId: 11,
        "review": "This was a good spot!",
        "stars": 5
      },
      {
        userId: 1,
        spotId: 12,
        "review": "This was a good spot!",
        "stars": 5
      },
      {
        userId: 2,
        spotId: 12,
        "review": "This was a good spot!",
        "stars": 4
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Reviews', {
      review: { [Op.in]: ["This was a bad spot!", "This was a good spot!"] }
    }, {});
  }
};
