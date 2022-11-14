'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Spots', [
      {
        "ownerId": 1,
        "address": "987 Tracy St",
        "city": "Eureka Springs",
        "state": "Arkansas",
        "country": "United States",
        "lat": 88.7645358,
        "lng": -122.4730329,
        "name": "GeoDome w/AC, Indoor Jetted Tub and Hilltop View's",
        "description": "Sits on 40 wooded acres with a cabin and another dome on 3.5 cleared acres.",
        "price": 189
      },
      {
        "ownerId": 1,
        "address": "123 Troost",
        "city": "San Francisco",
        "state": "California",
        "country": "United States of America",
        "lat": 99.7645358,
        "lng": -122.4730329,
        "name": "NEW On Creek! HUGE Deck- Elegant Luxury! Sleeps 15",
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
