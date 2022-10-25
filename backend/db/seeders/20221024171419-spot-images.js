'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('SpotImages', [
      {
        spotId: 1,
        url: "preview-bad-review-image-url1",
        preview: true
      },
      {
        spotId: 1,
        url: "no-preview-good-review-image-url1",
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
      }
    ], {});
  },
  down: async (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('SpotImages', {
      spotId: { [Op.in]: [1, 2] }
    }, {});
  }
};
