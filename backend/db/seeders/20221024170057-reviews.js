'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Reviews', [
      {
        userId: 1,
        spotId: 1,
        "review": "This was a great spot!",
        "stars": 5
      },
      {
        userId: 2,
        spotId: 1,
        "review": "This was a good spot!",
        "stars": 5
      },
      {
        userId: 3,
        spotId: 2,
        "review": "This was a good spot!",
        "stars": 4.94
      },
      {
        userId: 1,
        spotId: 3,
        "review": "This was a good spot!",
        "stars": 5.0
      }

    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Reviews', {
      review: { [Op.in]: ["This was a bad spot!", "This was a good spot!"] }
    }, {});
  }
};
