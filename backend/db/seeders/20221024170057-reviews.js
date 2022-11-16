'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Reviews', [
      {
        userId: 5,
        spotId: 1,
        "review": "Great hideaway, super place to decompress and take in the nature.",
        "stars": 5.0
      },
      {
        userId: 6,
        spotId: 1,
        "review": "This was a very unique experience\nCan’t wait to come back!",
        "stars": 5.0
      },
      {
        userId: 7,
        spotId: 1,
        "review": "Martin was very reachable when we had a minor housekeeping concern on check in and was quick to mediate the problem. After the issue was resolved our stay was excellent.",
        "stars": 5.0
      },
      {
        userId: 8,
        spotId: 1,
        "review": "Great experience and location for a scenic getaway!",
        "stars": 5.0
      },
      {
        userId: 9,
        spotId: 1,
        "review": "The views were so beautiful. The morning we were getting ready to leave there were 6 or more deer in the field below. It was so peaceful and we absolutely loved it.",
        "stars": 5.0
      },
      {
        userId: 10,
        spotId: 1,
        "review": "We absolutely love the experience!! The view was gorgeous. It was peak of the fall foliage when we went there and nothing is more perfect to have a cup of coffee outside the dome, while listening to the birds chirping.",
        "stars": 5.0
      },
      {
        userId: 11,
        spotId: 1,
        "review": "We really enjoyed staying here! It was the perfect quiet weekend! The property is easy to find; it was close to historic downtown and lots of outdoor recreation. Can't wait to come back!",
        "stars": 5.0
      },
      {
        userId: 12,
        spotId: 1,
        "review": "This place is amazing!! Can’t wait to return!",
        "stars": 4
      },
      {
        userId: 1,
        spotId: 2,
        "review": "Walk-in’ after Midnight was a really great stay. The property was beautifully designed. The Layout of the Home was perfect and just the right number of bathrooms to have our own",
        "stars": 5
      },
      {
        userId: 1,
        spotId: 3,
        "review": "Absolutely gorgeous view and stay! We loved how spacious it was for 8 people",
        "stars": 5.0
      },
      {
        userId: 2,
        spotId: 3,
        "review": "This house is absolutely beautiful and with so much to offer. The view is stunning. Perfect location. Will definitely recommend to friends and want o return ourselves.",
        "stars": 5.0
      },
      {
        userId: 4,
        spotId: 3,
        "review": "We enjoyed this gorgeous unique spot on the lake. It is decorated beautifully and was extremely peaceful and clean. Can’t wait to visit again in the summer.",
        "stars": 5.0
      },
      {
        userId: 5,
        spotId: 3,
        "review": "Beautiful container home right on the lake! The home is close to everything and is such a great amenity in itself!! We will be back!",
        "stars": 5.0
      },
      {
        userId: 6,
        spotId: 3,
        "review": "Awesome spot. Great location, right on the water. Hosts were responsive. Close to a grocery store too!",
        "stars": 4.0
      },
      {
        userId: 1,
        spotId: 4,
        "review": "The house was very nice and clean and the views were incredible. Kaley was very responsive to any questions we had during the stay.",
        "stars": 5
      },
      {
        userId: 1,
        spotId: 5,
        "review": "This is a beautiful home and property! Kaley is a great host and our stay was comfortable and relaxing. We would love to visit again.",
        "stars": 5
      },
      {
        userId: 1,
        spotId: 6,
        "review": "Very clean place, love the seclusion from other houses for privacy.",
        "stars": 5
      },
      {
        userId: 1,
        spotId: 7,
        "review": "Amazing place it was a phenomenal time will definitely be booking again. Every question I had upon arrival was answered immediately you will not be disappointed!",
        "stars": 5
      },
      {
        userId: 1,
        spotId: 8,
        "review": "Amazing place - Boathouse had great view of sunrise and sunset. House is super nice. Thank you for having us.",
        "stars": 5
      },
      {
        userId: 1,
        spotId: 9,
        "review": "Great place to rent",
        "stars": 5
      },
      {
        userId: 1,
        spotId: 10,
        "review": "Beautiful well maintained home directly on the lake.\nEverything you need to have a wonderful getaway with your family and friends. The view of the lake is amazing!!!!!!",
        "stars": 5
      },
      {
        userId: 1,
        spotId: 11,
        "review": "Fantastic house, dock, views and host! The pictures do not give this place justice for just how beautiful it really is! The roads are a little rough getting to the house once you're in the community, but it's absolutely worth it. The host made the entire process so easy and this was the perfect place to celebrate a birthday!",
        "stars": 5
      },
      {
        userId: 1,
        spotId: 12,
        "review": "Gorgeous house and view, even nicer than the photos. Comfy beds and everything you’d need. Kaley is very friendly and responsive. Great experience!",
        "stars": 5
      },
      {
        userId: 2,
        spotId: 12,
        "review": "Beautiful house and amazing location!",
        "stars": 4
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Reviews', {
      review: { [Op.in]: ["This was a bad spot!", "This was a good spot!"] }
    }, {});
  }
};
