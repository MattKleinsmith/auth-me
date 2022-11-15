'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('SpotImages', [
      {
        spotId: 1,
        url: "../images/00_0.webp",
        preview: true
      },
      {
        spotId: 1,
        url: "../images/00_1.webp",
        preview: false
      },
      {
        spotId: 1,
        url: "../images/00_2.webp",
        preview: false
      },
      {
        spotId: 1,
        url: "../images/00_3.webp",
        preview: false
      },
      {
        spotId: 1,
        url: "../images/00_4.webp",
        preview: false
      },
      {
        spotId: 2,
        url: "./images/01_0.webp",
        preview: true
      },
      {
        spotId: 2,
        url: "./images/01_0.webp",
        preview: false
      },
      {
        spotId: 2,
        url: "./images/01_0.webp",
        preview: false
      },
      // Not owned by User 1
      {
        spotId: 3,
        url: "./images/02_0.webp",
        preview: true
      }
    ], {});
  },
  down: async (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('SpotImages', {
      spotId: { [Op.in]: [1, 2, 3] }
    }, {});
  }
};
