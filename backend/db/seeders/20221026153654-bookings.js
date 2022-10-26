'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Bookings', [
      // Forbidden: Not owned
      {
        spotId: 1,
        userId: 2,
        startDate: "2021-11-19",
        endDate: "2021-11-20"
      },
      // Forbidden: Can't change past bookings
      {
        spotId: 1,
        userId: 1,
        startDate: "2021-12-19",
        endDate: "2021-12-20",
      },
      // Use these to cause overlaps
      {
        spotId: 1,
        userId: 1,
        startDate: "2025-12-1",
        endDate: "2025-12-10",
      },
      {
        spotId: 1,
        userId: 1,
        startDate: "2025-12-20",
        endDate: "2025-12-26",
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
