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
        "ownerId": 2,
        "address": "123 Troost",
        "city": "Broken Bow",
        "state": "Oklahoma",
        "country": "United States",
        "lat": 99.7645358,
        "lng": -122.4730329,
        "name": "NEW On Creek! HUGE Deck- Elegant Luxury! Sleeps 15",
        "description": "Nestled on a 2 acre lot with a flowing creek and expansive deck, Walkin' After Midnight is a stunning, chic, modern and rustic cabin. Privately owned and operated by Almost Heaven Luxury Cabins, LLC, Walkin' After Midnight will sleep 15! It is located on a cul-de-sac street with 80' pine trees and a large circular driveway to pull your boat. You'll love the 1600sf deck w/ built in grill, bev fridge & outdoor games.",
        "price": 498
      },
      {
        "ownerId": 3,
        "address": "456 Vivian",
        "city": "Lake Hamilton",
        "state": "Arkansas",
        "country": "United States",
        "lat": 111.7645358,
        "lng": -122.4730329,
        "name": "⭐️The Outlook Shipping Container Lakehouse⭐️ Amazing Views 🌅",
        "description": "Welcome to the brand new Hygge Hideaway! As soon as you drive up, you'll see that that this lakefront cabin sits right next to our very own Pine Lake and is all about unplugging and getting back to the simple, enjoyable moments that make life grand. Hygge Hideaway greets you with an airy, open floor plan interspersed with nature-inspired design choices and whimsical decor––hinting that you should let out your inner \"cabin life\" state of mind and let yourself be charmed into instant vacation mode!",
        "price": 471
      },
      {
        "ownerId": 4,
        "address": "456 Vivian",
        "city": "Granbury",
        "state": "Texas",
        "country": "United States",
        "lat": 111.7645358,
        "lng": -122.4730329,
        "name": "Trails edge lake house, boat dock, & best views!!!",
        "description": "Make memories to last a lifetime on lake Granbury, as well as having the best view in town. BRING YOUR BOAT!!!! Two story dock that is covered, has 2 boat slips, and plenty room for lake activities. Have a perfect view of the most beautiful sunrises and sunsets!! Centrally located between the Historic Granbury Square, Fossil Rim Wildlife Center and Dinosaur Valley State Park!",
        "price": 300
      },
      {
        "ownerId": 5,
        "address": "456 Vivian",
        "city": "Osage Beach",
        "state": "Missouri",
        "country": "United States",
        "lat": 111.7645358,
        "lng": -122.4730329,
        "name": "Luxury Knolls Mansion, private pool and hot tub!",
        "description": "What's not to love about this place! One of the most unique homes on the lake comes with the best views on the lake, private outdoor pool and hot tub, excellent location and gives you access to all of the fantastic Knolls amenities (shared indoor pool/hot tub, sauna, steam room, tennis courts and more). Not that you need to ever leave the house, but if you do you're a short drive or boat ride to Redhead Yacht Club, Margaritaville Landshark Bar, Shorty Pants and many other great spots!",
        "price": 643
      },
      {
        "ownerId": 6,
        "address": "456 Vivian",
        "city": "Cassopolis",
        "state": "Michigan",
        "country": "United States",
        "lat": 111.7645358,
        "lng": -122.4730329,
        "name": "Gorgeous 4 BR Home on Peaceful Shavehead Lake",
        "description": "Beautiful, newly renovated (2021) lakefront home on Shavehead Lake! Take out the kayaks or paddleboards for a morning ride on the calm, spring-fed lake.  Bring a boat or rent one for endless days in the sun! ",
        "price": 645
      },
      {
        "ownerId": 7,
        "address": "456 Vivian",
        "city": "Chicago",
        "state": "Illinois",
        "country": "United States",
        "lat": 111.7645358,
        "lng": -122.4730329,
        "name": "55/56 Floor VIEW, Pool, Fireplace, Fitness Center.",
        "description": "PH#1 is a magnificent unique rental in Chicago.  Towering 55 stories above the city, with dramatic living areas and exquisite fireplace, this Penthouse  gives you the ultimate in city living.  It's all about the views and location; nowhere in Chicago can you stay with view like these.  Bordered by the elegance and glamour of North Michigan Avenue to the east and the artsy sophistication of the River North District to the west, PH#1 is at the heart of one of Chicago most exciting neighborhoods.",
        "price": 639
      },
      {
        "ownerId": 8,
        "address": "456 Vivian",
        "city": "Wisconsin Dells",
        "state": "Wisconsin",
        "country": "United States",
        "lat": 111.7645358,
        "lng": -122.4730329,
        "name": "The Lighthouse - cheerful Lake Blass five-bedroom",
        "description": "The Lighthouse is a lakefront property close to downtown Wisconsin Dells. You’ll love our house because of the coziness, the location, and the views. Also the complimentary use of three kayaks, two row boats and one canoe!  Our house is good for couples, families (with kids), and groups up to 14.",
        "price": 479
      },
      {
        "ownerId": 9,
        "address": "456 Vivian",
        "city": "Hot Springs",
        "state": "Arkansas",
        "country": "United States",
        "lat": 111.7645358,
        "lng": -122.4730329,
        "name": "Home w/Pool & Mtn Lake Views!",
        "description": "Enjoy one of the best views that Lake Hamilton has to offer while spending afternoons relaxing in the pool or playing on the lake!  Waterfront property with swimming pool spans across 2 levels with tremendous mountain and lake views from both inside and outside the house.  The multi-level family home has 5 Bedrooms, a fully-stocked kitchen with two adjoining dining areas, and large living space.  A covered dock and pool are also available for your use!",
        "price": 379
      },
      {
        "ownerId": 10,
        "address": "456 Vivian",
        "city": "Branson",
        "state": "Missouri",
        "country": "United States",
        "lat": 111.7645358,
        "lng": -122.4730329,
        "name": "LAKEFRONT Deck, All New Gorgeous 2 Bedroom",
        "description": "All new modern condo with style and comfort in mind. This beautiful and serene space is on the third floor, featuring breathtaking views of Lake Taneycomo.\nConveniently located off the main drag (highway 76) and within 10-20 minutes of all Branson has to offer; shows, great food, shopping, and amazing views.",
        "price": 126
      },
      {
        "ownerId": 11,
        "address": "456 Vivian",
        "city": "Lindstrom",
        "state": "Minnesota",
        "country": "United States",
        "lat": 111.7645358,
        "lng": -122.4730329,
        "name": "22 Oaks Spacious, secluded Lake House",
        "description": "3.5 acre end of the road Custom built home, on a small lake perfect for kayaking or fishing. Within minutes to multiple larger lakes and beaches. This area is secluded, spacious and peaceful  with many different areas on the property to relax with friends and family. The large deck is a great place to grill out and to watch the spectacular sunsets. Perfect for a week long stay.  Five quaint river towns are within a half hour drive.",
        "price": 480
      },
      {
        "ownerId": 2,
        "address": "456 Vivian",
        "city": "Manistee",
        "state": "Michigan",
        "country": "United States",
        "lat": 111.7645358,
        "lng": -122.4730329,
        "name": "Exquisite Private Lake Front Family Home",
        "description": "2022 Boardwalk Vacation Rental Management COVID Update: Beautiful Northern Michigan is open for business and proper procedures have been implemented in order to ensure a safe and efficient clean between each rental.",
        "price": 536
      },
      {
        "ownerId": 3,
        "address": "456 Vivian",
        "city": "Broken Bow",
        "state": "Oklahoma",
        "country": "United States",
        "lat": 111.7645358,
        "lng": -122.4730329,
        "name": "Sunrise Sanctuary",
        "description": "SUNRISE SANCTUARY has a Native American theme with vivid colors and designs that follow somewhat of a Southwestern flair, but holding true to the Native American love and respect for our wildlife, beautiful mountainous land and clean unspoiled environment, free from the hustles and bustles of city life.",
        "price": 275
      },
      {
        "ownerId": 4,
        "address": "456 Vivian",
        "city": "Twin Lakes",
        "state": "Wisconsin",
        "country": "United States",
        "lat": 111.7645358,
        "lng": -122.4730329,
        "name": "Cove at 420: Modern Lake Front Home near Chicago",
        "description": "Welcome to the Cove at 420.  A modern vacation paradise where indoor and outdoor lines blur.  Every space is designed for enjoyment.  A short 75 minute drive from Chicago, this is a true retreat.  Wake up to beautiful sunrise views or enjoy them from a kayak on the water.  We offer kayaks, paddle boards, a catamaran, hot tub & sauna, Sonos sound system, a fire pit and plenty of yard games for our guests.",
        "price": 500
      },
      {
        "ownerId": 5,
        "address": "456 Vivian",
        "city": "Branson",
        "state": "Missouri",
        "country": "United States",
        "lat": 111.7645358,
        "lng": -122.4730329,
        "name": "NEW 4-Bedroom Branson",
        "description": "Let your trip to Branson begin at this beautiful condo perfect for families! Just minutes away from Silver Dollar City and the Branson Strip! You won't want to miss the opportunity to stay at this newly built 4-bedroom condo at The Vineyards Terrace.",
        "price": 185
      },
      {
        "ownerId": 6,
        "address": "456 Vivian",
        "city": "Section",
        "state": "Alabama",
        "country": "United States",
        "lat": 111.7645358,
        "lng": -122.4730329,
        "name": "The Overlook on the Brow!",
        "description": "PROVIDING BREATHTAKING VIEWS OF THE TENNESSEE RIVER BELOW...Imagine having morning coffee or enjoying a relaxing evening from the covered deck while savoring the VIEW atop Sand Mtn!",
        "price": 189
      },
      {
        "ownerId": 7,
        "address": "456 Vivian",
        "city": "Big Sandy",
        "state": "Tennessee",
        "country": "United States",
        "lat": 111.7645358,
        "lng": -122.4730329,
        "name": "Luxury Lake House on Kentucky Lake sleeps 12+",
        "description": "Breathtaking views of Kentucky lake are framed by the windows throughout the house. Two large decks create the perfect outdoor space to grill while enjoying the view. Main level has a large living room w/ gourmet kitchen, half bath and one large bedroom w/ king sized bed and private bath. ",
        "price": 308
      },
      {
        "ownerId": 1,
        "address": "456 Vivian",
        "city": "Paradise Hill",
        "state": "Oklahoma",
        "country": "United States",
        "lat": 111.7645358,
        "lng": -122.4730329,
        "name": "The Guide House - Cottage-feel Cabin w/ Lake View",
        "description": "Welcome to a paradise near Paradise Hills!\nWhether you are looking to slow down and relax or enjoy all the lake has to offer, the Guide House is the place for you!",
        "price": 175
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Spots', {
      address: { [Op.in]: ['987 Tracy', '123 Troost', '456 Vivian'] }
    }, {});
  }
};
