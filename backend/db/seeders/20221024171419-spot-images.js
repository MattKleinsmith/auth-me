'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('SpotImages', [
      {
        spotId: 1,
        url: "/images/01_0.webp",
        preview: true
      },
      {
        spotId: 1,
        url: "/images/01_1.webp",
        preview: false
      },
      {
        spotId: 1,
        url: "/images/01_2.webp",
        preview: false
      },
      {
        spotId: 1,
        url: "/images/01_3.webp",
        preview: false
      },
      {
        spotId: 1,
        url: "/images/01_4.webp",
        preview: false
      },
      {
        spotId: 2,
        url: "/images/02_0.webp",
        preview: true
      },
      {
        spotId: 3,
        url: "/images/03_0.webp",
        preview: true
      },
      {
        spotId: 4,
        url: "/images/04_0.webp",
        preview: true
      },
      {
        spotId: 5,
        url: "/images/05_0.webp",
        preview: true
      },
      {
        spotId: 6,
        url: "/images/06_0.webp",
        preview: true
      },
      {
        spotId: 7,
        url: "/images/07_0.webp",
        preview: true
      },
      {
        spotId: 8,
        url: "/images/08_0.webp",
        preview: true
      },
      {
        spotId: 9,
        url: "/images/09_0.webp",
        preview: true
      },
      {
        spotId: 10,
        url: "/images/10_0.webp",
        preview: true
      },
      {
        spotId: 11,
        url: "/images/11_0.webp",
        preview: true
      },
      {
        spotId: 12,
        url: "/images/12_0.webp",
        preview: true
      },
      {
        spotId: 13,
        url: "/images/13_0.webp",
        preview: true
      },
      {
        spotId: 14,
        url: "/images/14_0.webp",
        preview: true
      },
      {
        spotId: 15,
        url: "/images/15_0.webp",
        preview: true
      },
      {
        spotId: 16,
        url: "/images/16_0.webp",
        preview: true
      },
      {
        spotId: 17,
        url: "/images/17_0.webp",
        preview: true
      },
      {
        spotId: 18,
        url: "/images/18_0.webp",
        preview: true
      },
    ], {});
  },
  down: async (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('SpotImages', {
      spotId: { [Op.in]: [1, 2, 3] }
    }, {});
  }
};
