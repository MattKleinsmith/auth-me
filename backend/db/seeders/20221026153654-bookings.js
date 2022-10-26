'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Bookings', [
      {
        spotId: 1,
        userId: 2,
        startDate: "2021-11-19",
        endDate: "2021-11-20"
      },
      {
        spotId: 1,
        userId: 2,
        startDate: "2021-12-19",
        endDate: "2021-12-20",
      },
      {
        spotId: 2,
        userId: 1,
        startDate: "2021-12-23",
        endDate: "2021-12-24",
      }
    ], {});
  },
  down: async (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Bookings', {
      spotId: { [Op.in]: [1, 2] }
    }, {});
  }
};
