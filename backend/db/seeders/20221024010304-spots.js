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
        "description": "Adventure meets luxury with this one of a kind climate controlled glamping excursion. All the best of nature combined with the luxury of an upscale hotel room. Gaze up at the stars or out at the rolling Eureka forestry from the comfort of your 100% climate controlled dome. Soak in the jetted tub cookout on the deck and drink cocktails from the built in hammock. 15min to Eureka Springs downtown. NO WIFI and cell service is spotty.",
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
