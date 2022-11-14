'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('SpotImages', [
      {
        spotId: 1,
        url: "../images/Eureka Springs0.webp",
        preview: true
      },
      {
        spotId: 1,
        url: "../images/Eureka Springs1.webp",
        preview: false
      },
      {
        spotId: 2,
        url: "preview-bad-review-image-url2",
        preview: true
      },
      {
        spotId: 2,
        url: "no-preview-good-review-image-url2",
        preview: false
      },
      {
        spotId: 2,
        url: "no-preview-good-review-image-url23",
        preview: false
      },
      // Not owned by User 1
      {
        spotId: 3,
        url: "no-preview-good-review-image-url23",
        preview: false
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
