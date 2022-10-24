'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Spots', [
      {
        "ownerId": 1,
        "address": "987 Tracy",
        "city": "San Francisco",
        "state": "California",
        "country": "United States of America",
        "lat": 88.7645358,
        "lng": -122.4730329,
        "name": "Tracy Haven",
        "description": "Tracy description",
        "price": 150
      },
      {
        "ownerId": 1,
        "address": "123 Troost",
        "city": "San Francisco",
        "state": "California",
        "country": "United States of America",
        "lat": 99.7645358,
        "lng": -122.4730329,
        "name": "Troost Place",
        "description": "Troost description",
        "price": 100
      },
      {
        "ownerId": 2,
        "address": "456 Vivian",
        "city": "San Francisco",
        "state": "California",
        "country": "United States of America",
        "lat": 111.7645358,
        "lng": -122.4730329,
        "name": "Vivian Castle",
        "description": "Vivian description",
        "price": 100
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Spots', {
      address: { [Op.in]: ['987 Tracy', '123 Troost', '456 Vivian'] }
    }, {});
  }
};
