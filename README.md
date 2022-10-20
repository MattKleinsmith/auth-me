# AirBnB clone API

![image](https://user-images.githubusercontent.com/8968171/197027823-e61c7725-4f9b-4f77-b4b8-c314bd4a89a5.png)

## currentUser

<details><summary>Get current user: GET /api/currentUser</summary>

Response

```js
Status: 200
Headers:
- Content-Type: application/json
Body:
{
  "id": 1,
  "firstName": "John",
  "lastName": "Smith",
  "email": "john.smith@gmail.com",
  "username": "JohnSmith"
}
```

</details>

<details><summary>Log in: POST /api/login</summary>

Request

```js
Headers:
- Content-Type: application/json
Body:
{
  "credential": "john.smith@gmail.com",
  "password": "secret password"
}
```

Successful response

```js
Status: 200
Headers:
- Content-Type: application/json
Body:
{
  "id": 1,
  "firstName": "John",
  "lastName": "Smith",
  "email": "john.smith@gmail.com",
  "username": "JohnSmith",
  "token": ""
}
```

Error responses

```js
Status: 401
Headers:
- Content-Type: application/json
Body:
{
  "message": "Invalid credentials",
  "statusCode": 401
}
```

```js
Status: 400
Headers:
- Content-Type: application/json
Body:
{
  "message": "Validation error",
  "statusCode": 400,
  "errors": {
    "credential": "Email or username is required",
    "password": "Password is required"
  }
}
```

</details>


<details><summary>Sign up and log in: POST /api/signup</summary>

Request

```js
Headers:
- Content-Type: application/json
Body:
{
  "firstName": "John",
  "lastName": "Smith",
  "email": "john.smith@gmail.com",
  "username": "JohnSmith",
  "password": "secret password"
}
```

Successful response

```js
Status: 201
Headers:
- Content-Type: application/json
Body:
{
  "id": 1,
  "firstName": "John",
  "lastName": "Smith",
  "email": "john.smith@gmail.com",
  "username": "JohnSmith",
  "token": ""
}
```

Error responses

```js
Status: 403
Headers:
- Content-Type: application/json
Body:
{
  "message": "User already exists",
  "statusCode": 403,
  "errors": {
    "email": "User with that email already exists"
  }
}
```

```js
Status: 400
Headers:
- Content-Type: application/json
Body:
{
  "message": "Validation error",
  "statusCode": 400,
  "errors": {
    "email": "Invalid email",
    "username": "Username is required",
    "firstName": "First Name is required",
    "lastName": "Last Name is required"
  }
}
```

</details>


## spots

<details><summary>Get all spots: GET /api/spots</summary>

Response

```js
Status: 200
Headers:
- Content-Type: application/json
Body:
{
  "Spots": [
    {
      "id": 1,
      "ownerId": 1,
      "address": "123 Disney Lane",
      "city": "San Francisco",
      "state": "California",
      "country": "United States of America",
      "lat": 37.7645358,
      "lng": -122.4730327,
      "name": "App Academy",
      "description": "Place where web developers are created",
      "price": 123,
      "createdAt": "2021-11-19 20:39:36",
      "updatedAt": "2021-11-19 20:39:36",
      "avgRating": 4.5,
      "previewImage": "image url"
    }
  ]
}
```

</details>

<details><summary>Search for spots: GET /api/spots?queryParam0=value0&queryParam1=value1</summary>

<br>

| Query parameters  | Type and constraints |
| ------------- | ------------- |
| page     | integer, minimum: 0, maximum: 10, default: 0 |
| size     | integer, minimum: 0, maximum: 20, default: 20 |
| minLat   | decimal, optional |
| maxLat   | decimal, optional |
| minLng   | decimal, optional |
| maxLng   | decimal, optional |
| minPrice | decimal, optional, minimum: 0 |
| maxPrice | decimal, optional, minimum: 0 |

Successful response

```js
Status: 200
Headers:
- Content-Type: application/json
Body:
{
  "Spots":[
    {
      "id": 1,
      "ownerId": 1,
      "address": "123 Disney Lane",
      "city": "San Francisco",
      "state": "California",
      "country": "United States of America",
      "lat": 37.7645358,
      "lng": -122.4730327,
      "name": "App Academy",
      "description": "Place where web developers are created",
      "price": 123,
      "createdAt": "2021-11-19 20:39:36",
      "updatedAt": "2021-11-19 20:39:36",
      "previewImage": "image url"
    }
  ],
  "page": 2,
  "size": 25
}
```

Error response

```js
Status: 400
Headers:
- Content-Type: application/json
Body:
{
  "message": "Validation Error",
  "statusCode": 400,
  "errors": {
    "page": "Page must be greater than or equal to 0",
    "size": "Size must be greater than or equal to 0",
    "maxLat": "Maximum latitude is invalid",
    "minLat": "Minimum latitude is invalid",
    "minLng": "Maximum longitude is invalid",
    "maxLng": "Minimum longitude is invalid",
    "minPrice": "Maximum price must be greater than or equal to 0",
    "maxPrice": "Minimum price must be greater than or equal to 0"
  }
}
```

</details>


<details><summary>Get a user's spots: GET /api/currentUser/spots</summary>

Response

```js
Status: 200
Headers:
- Content-Type: application/json
Body:
{
  "Spots": [
    {
      "id": 1,
      "ownerId": 1,
      "address": "123 Disney Lane",
      "city": "San Francisco",
      "state": "California",
      "country": "United States of America",
      "lat": 37.7645358,
      "lng": -122.4730327,
      "name": "App Academy",
      "description": "Place where web developers are created",
      "price": 123,
      "createdAt": "2021-11-19 20:39:36",
      "updatedAt": "2021-11-19 20:39:36",
      "avgRating": 4.5,
      "previewImage": "image url"
    }
  ]
}
```

</details>

<details><summary>Get a spot: GET /api/spots/:spotId</summary>

Successful response

```js
Status: 200
Headers:
- Content-Type: application/json
Body:
{
  "id": 1,
  "ownerId": 1,
  "address": "123 Disney Lane",
  "city": "San Francisco",
  "state": "California",
  "country": "United States of America",
  "lat": 37.7645358,
  "lng": -122.4730327,
  "name": "App Academy",
  "description": "Place where web developers are created",
  "price": 123,
  "createdAt": "2021-11-19 20:39:36",
  "updatedAt": "2021-11-19 20:39:36" ,
  "numReviews": 5,
  "avgStarRating": 4.5,
  "SpotImages": [
    {
      "id": 1,
      "url": "image url",
      "preview": true
    },
    {
      "id": 2,
      "url": "image url",
      "preview": false
    }
  ],
  "Owner": {
    "id": 1,
    "firstName": "John",
    "lastName": "Smith"
  }
}
```

Error response

```js
Status: 404
Headers:
- Content-Type: application/json
Body:
{
  "message": "Spot couldn't be found",
  "statusCode": 404
}
```

</details>

<details><summary>Create a spot: POST /api/spots</summary>

Request

```js
Headers:
- Content-Type: application/json
Body:
{
  "address": "123 Disney Lane",
  "city": "San Francisco",
  "state": "California",
  "country": "United States of America",
  "lat": 37.7645358,
  "lng": -122.4730327,
  "name": "App Academy",
  "description": "Place where web developers are created",
  "price": 123
}
```

Successful response

```js
Status: 201
Headers:
- Content-Type: application/json
Body:
{
  "id": 1,
  "ownerId": 1,
  "address": "123 Disney Lane",
  "city": "San Francisco",
  "state": "California",
  "country": "United States of America",
  "lat": 37.7645358,
  "lng": -122.4730327,
  "name": "App Academy",
  "description": "Place where web developers are created",
  "price": 123,
  "createdAt": "2021-11-19 20:39:36",
  "updatedAt": "2021-11-19 20:39:36"
}
```

Error response

```js
Status: 400
Headers:
- Content-Type: application/json
Body:
{
  "message": "Validation Error",
  "statusCode": 400,
  "errors": {
    "address": "Street address is required",
    "city": "City is required",
    "state": "State is required",
    "country": "Country is required",
    "lat": "Latitude is not valid",
    "lng": "Longitude is not valid",
    "name": "Name must be less than 50 characters",
    "description": "Description is required",
    "price": "Price per day is required"
  }
}
```

</details>

<details><summary>Add an image to a spot: POST /api/spots/:spotId/images</summary>

Request

```js
Headers:
- Content-Type: application/json
Body:
{
  "url": "image url",
  "preview": true
}
```

Successful response

```js
Status: 201
Headers:
- Content-Type: application/json
Body:
{
  "id": 1,
  "url": "image url",
  "preview": true
}
```

Error response

```js
Status: 404
Headers:
- Content-Type: application/json
Body:
{
  "message": "Spot couldn't be found",
  "statusCode": 404
}
```

</details>

<details><summary>Update a spot: PUT /api/spots/:spotId</summary>

Request

```js
Headers:
- Content-Type: application/json
Body:
{
  "address": "123 Disney Lane",
  "city": "San Francisco",
  "state": "California",
  "country": "United States of America",
  "lat": 37.7645358,
  "lng": -122.4730327,
  "name": "App Academy",
  "description": "Place where web developers are created",
  "price": 123
}
```

Successful response

```js
Status: 200
Headers:
- Content-Type: application/json
Body:
{
  "id": 1,
  "ownerId": 1,
  "address": "123 Disney Lane",
  "city": "San Francisco",
  "state": "California",
  "country": "United States of America",
  "lat": 37.7645358,
  "lng": -122.4730327,
  "name": "App Academy",
  "description": "Place where web developers are created",
  "price": 123,
  "createdAt": "2021-11-19 20:39:36",
  "updatedAt": "2021-11-20 10:06:40"
}
```

Error responses

```js
Status: 400
Headers:
- Content-Type: application/json
Body:
{
  "message": "Validation Error",
  "statusCode": 400,
  "errors": {
    "address": "Street address is required",
    "city": "City is required",
    "state": "State is required",
    "country": "Country is required",
    "lat": "Latitude is not valid",
    "lng": "Longitude is not valid",
    "name": "Name must be less than 50 characters",
    "description": "Description is required",
    "price": "Price per day is required"
  }
}
```

```js
Status: 404
Headers:
- Content-Type: application/json
Body:
{
  "message": "Spot couldn't be found",
  "statusCode": 404
}
```

</details>


<details><summary>Delete a spot: DELETE /api/spots/:spotId</summary>

Successful response

```js
Status: 200
Headers:
- Content-Type: application/json
Body:
{
  "message": "Successfully deleted",
  "statusCode": 200
}
```

Error response

```js
Status: 404
Headers:
- Content-Type: application/json
Body:
{
  "message": "Spot couldn't be found",
  "statusCode": 404
}
```

</details>

## reviews

<details><summary>Get a user's reviews: GET /api/currentUser/reviews</summary>

Response

```js
Status: 200
Headers:
- Content-Type: application/json
Body:
{
  "Reviews": [
    {
      "id": 1,
      "userId": 1,
      "spotId": 1,
      "review": "This was an awesome spot!",
      "stars": 5,
      "createdAt": "2021-11-19 20:39:36",
      "updatedAt": "2021-11-19 20:39:36" ,
      "User": {
        "id": 1,
        "firstName": "John",
        "lastName": "Smith"
      },
      "Spot": {
        "id": 1,
        "ownerId": 1,
        "address": "123 Disney Lane",
        "city": "San Francisco",
        "state": "California",
        "country": "United States of America",
        "lat": 37.7645358,
        "lng": -122.4730327,
        "name": "App Academy",
        "price": 123,
        "previewImage": "image url"
      },
      "ReviewImages": [
        {
          "id": 1,
          "url": "image url"
        }
      ]
    }
  ]
}
```

</details>

<details><summary>Get a spot's reviews: GET /api/spots/:spotId/reviews</summary>

Successful response

```js
Status: 200
Headers:
- Content-Type: application/json
Body:
{
  "Reviews": [
    {
      "id": 1,
      "userId": 1,
      "spotId": 1,
      "review": "This was an awesome spot!",
      "stars": 5,
      "createdAt": "2021-11-19 20:39:36",
      "updatedAt": "2021-11-19 20:39:36" ,
      "User": {
        "id": 1,
        "firstName": "John",
        "lastName": "Smith"
      },
      "ReviewImages": [
        {
          "id": 1,
          "url": "image url"
        }
      ],
    }
  ]
}
```

Error response

```js
Status: 404
Headers:
- Content-Type: application/json
Body:
{
  "message": "Spot couldn't be found",
  "statusCode": 404
}
```

</details>

<details><summary>Add a review to a spot: POST /api/spots/:spotId/reviews</summary>

Request

```js
Headers:
- Content-Type: application/json
Body:
{
  "review": "This was an awesome spot!",
  "stars": 5,
}
```

Successful response

```js
Status: 201
Headers:
- Content-Type: application/json
Body:
{
  "id": 1,
  "userId": 1,
  "spotId": 1,
  "review": "This was an awesome spot!",
  "stars": 5,
  "createdAt": "2021-11-19 20:39:36",
  "updatedAt": "2021-11-19 20:39:36"
}
```

Error responses

```js
Status: 400
Headers:
- Content-Type: application/json
Body:
{
  "message": "Validation error",
  "statusCode": 400,
  "errors": {
    "review": "Review text is required",
    "stars": "Stars must be an integer from 1 to 5",
  }
}
```

```js
Status: 404
Headers:
- Content-Type: application/json
Body:
{
  "message": "Spot couldn't be found",
  "statusCode": 404
}
```

```js
Status: 403
Headers:
- Content-Type: application/json
Body:
{
  "message": "User already has a review for this spot",
  "statusCode": 403
}
```

</details>

<details><summary>Add an image to a review: POST /api/reviews/:reviewId/images</summary>

<br>

The review must belong to the current user.


Request

```js
Headers:
- Content-Type: application/json
Body:
{
  "url": "image url"
}
```

Successful response

```js
Status: 201
Headers:
- Content-Type: application/json
Body:
{
  "id": 1,
  "url": "image url"
}
```

Error responses

```js
Status: 404
Headers:
- Content-Type: application/json
Body:
{
  "message": "Review couldn't be found",
  "statusCode": 404
}
```

```js
Status: 403
Headers:
- Content-Type: application/json
Body:
{
  "message": "Maximum number of images for this resource was reached",
  "statusCode": 403
}
```

</details>


<details><summary>Update a review: PUT /api/reviews/:reviewId</summary>

<br>

The review must belong to the current user.

Request

```js
Headers:
- Content-Type: application/json
Body:
{
  "review": "This was an awesome spot!",
  "stars": 5,
}
```

Successful response

```js
Status: 200
Headers:
- Content-Type: application/json
Body:
{
  "id": 1,
  "userId": 1,
  "spotId": 1,
  "review": "This was an awesome spot!",
  "stars": 5,
  "createdAt": "2021-11-19 20:39:36",
  "updatedAt": "2021-11-20 10:06:40"
}
```

Error responses

```js
Status: 400
Headers:
- Content-Type: application/json
Body:
{
  "message": "Validation error",
  "statusCode": 400,
  "errors": {
    "review": "Review text is required",
    "stars": "Stars must be an integer from 1 to 5",
  }
}
```

```js
Status: 404
Headers:
- Content-Type: application/json
Body:
  {
    "message": "Review couldn't be found",
    "statusCode": 404
  }
```

</details>

<details><summary>Delete a review: DELETE /api/reviews/:reviewId</summary>

<br>

The review must belong to the current user.

Successful response

```js
Status: 200
Headers:
- Content-Type: application/json
Body:
{
  "message": "Successfully deleted",
  "statusCode": 200
}
```

Error response

```js
Status: 404
Headers:
- Content-Type: application/json
Body:
{
  "message": "Review couldn't be found",
  "statusCode": 404
}
```

</details>

## bookings

<details><summary>Get user's bookings: GET /api/currentUser/bookings</summary>

Response

```js
Status: 200
Headers:
- Content-Type: application/json
Body:
{
  "Bookings": [
    {
      "id": 1,
      "spotId": 1,
      "Spot": {
        "id": 1,
        "ownerId": 1,
        "address": "123 Disney Lane",
        "city": "San Francisco",
        "state": "California",
        "country": "United States of America",
        "lat": 37.7645358,
        "lng": -122.4730327,
        "name": "App Academy",
        "price": 123,
        "previewImage": "image url"
      },
      "userId": 2,
      "startDate": "2021-11-19",
      "endDate": "2021-11-20",
      "createdAt": "2021-11-19 20:39:36",
      "updatedAt": "2021-11-19 20:39:36"
    }
  ]
}
```

</details>

<details><summary>Get a spot's bookings: GET /api/spots/:spotId/bookings</summary>

Response to non-owner

```js
Status: 200
Headers:
- Content-Type: application/json
Body:
{
  "Bookings": [
    {
      "spotId": 1,
      "startDate": "2021-11-19",
      "endDate": "2021-11-20"
    }
  ]
}
```

Response to owner

```js
Status: 200
Headers:
- Content-Type: application/json
Body:
{
  "Bookings": [
    {
      "User": {
        "id": 2,
        "firstName": "John",
        "lastName": "Smith"
      },
      "id": 1,
      "spotId": 1,
      "userId": 2,
      "startDate": "2021-11-19",
      "endDate": "2021-11-20",
      "createdAt": "2021-11-19 20:39:36",
      "updatedAt": "2021-11-19 20:39:36"
    }
  ]
}
```

Error response

```js
Status: 404
Headers:
- Content-Type: application/json
Body:
{
  "message": "Spot couldn't be found",
  "statusCode": 404
}
```

</details>

<details><summary>Create a booking: POST /api/spots/:spotId/bookings</summary>

Request

```js
Headers:
- Content-Type: application/json
Body:
{
  "startDate": "2021-11-19",
  "endDate": "2021-11-20"
}
```

Successful response

```js
Status: 201
Headers:
- Content-Type: application/json
Body:
{
  "id": 1,
  "spotId": 1,
  "userId": 2,
  "startDate": "2021-11-19",
  "endDate": "2021-11-20",
  "createdAt": "2021-11-19 20:39:36",
  "updatedAt": "2021-11-19 20:39:36"
}
```

Error responses

```js
Status: 403
Headers:
- Content-Type: application/json
Body:
{
  "message": "Sorry, this spot is already booked for the specified dates",
  "statusCode": 403,
  "errors": {
    "startDate": "Start date conflicts with an existing booking",
    "endDate": "End date conflicts with an existing booking"
  }
}
```

```js
Status: 400
Headers:
- Content-Type: application/json
Body:
{
  "message": "Validation error",
  "statusCode": 400,
  "errors": {
    "endDate": "endDate cannot be on or before startDate"
  }
}
```

```js
Status: 404
Headers:
- Content-Type: application/json
Body:
{
  "message": "Spot couldn't be found",
  "statusCode": 404
}
```

</details>

<details><summary>Update a booking: PUT /api/spots/:spotId/bookings</summary>

Request

```js
Headers:
- Content-Type: application/json
Body:
{
  "startDate": "2021-11-19",
  "endDate": "2021-11-20"
}
```

Successful response

```js
Status: 200
Headers:
- Content-Type: application/json
Body:
{
  "id": 1,
  "spotId": 1,
  "userId": 2,
  "startDate": "2021-11-19",
  "endDate": "2021-11-20",
  "createdAt": "2021-11-19 20:39:36",
  "updatedAt": "2021-11-20 10:06:40"
}
```

Error responses

```js
Status: 403
Headers:
- Content-Type: application/json
Body:
{
  "message": "Sorry, this spot is already booked for the specified dates",
  "statusCode": 403,
  "errors": {
    "startDate": "Start date conflicts with an existing booking",
    "endDate": "End date conflicts with an existing booking"
  }
}
```

```js
Status: 403
Headers:
- Content-Type: application/json
Body:
{
  "message": "Past bookings can't be modified",
  "statusCode": 403
}
```

```js
Status: 400
Headers:
- Content-Type: application/json
Body:
{
  "message": "Validation error",
  "statusCode": 400,
  "errors": {
    "endDate": "endDate cannot come before startDate"
  }
}
```

```js
Status: 404
Headers:
- Content-Type: application/json
Body:
{
  "message": "Booking couldn't be found",
  "statusCode": 404
}
```

</details>

<details><summary>Delete a booking: DELETE /api/bookings/:bookingId</summary>

<br>

The booking must belong to the current user or spot owner.

Response

```js
Status: 200
Headers:
- Content-Type: application/json
Body:
{
  "message": "Successfully deleted",
  "statusCode": 200
}
```

Error responses

```js
Status: 403
Headers:
- Content-Type: application/json
Body:
{
  "message": "Bookings that have been started can't be deleted",
  "statusCode": 403
}
```

```js
Status: 404
Headers:
- Content-Type: application/json
Body:
{
  "message": "Booking couldn't be found",
  "statusCode": 404
}
```

</details>

## images

<details><summary>Delete an image: DELETE /api/images/:imageId</summary>

<br>

The image must belong to the current user.

Response

```js
Status: 200
Headers:
- Content-Type: application/json
Body:
{
  "message": "Successfully deleted",
  "statusCode": 200
}
```

Error responses

```js
Status: 404
Headers:
- Content-Type: application/json
Body:
{
  "message": "Image couldn't be found",
  "statusCode": 404
}
```

</details>

## Error responses

<details><summary>User not logged in</summary>

<br>

```js
Status: 401
Headers:
- Content-Type: application/json
Body:
{
  "message": "Authentication required",
  "statusCode": 401
}
```

</details>

<details><summary>User lacks authorization</summary>

<br>

```js
Status: 403
Headers:
- Content-Type: application/json
Body:
{
  "message": "Forbidden",
  "statusCode": 403
}
```

</details>
