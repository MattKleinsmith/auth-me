import { csrfFetch } from './csrf';

const GET_REVIEWS = 'reviews/GET_REVIEWS';

export const getReviews = (spotId) => async dispatch => {
    const response = await csrfFetch(`/api/spots/${spotId}/reviews`);
    const body = await response.json();
    const reviews = body.Reviews;
    dispatch({ type: GET_REVIEWS, reviews });
    return response;
};

export const postReview = (body, url, spotId) => async () => {
    const response = await csrfFetch(`/api/spots/${spotId}/reviews`, {
        method: "POST",
        body: JSON.stringify(body)
    });
    const review = await response.json();

    await csrfFetch(`/api/reviews/${review.id}/images`, {
        method: "POST",
        body: JSON.stringify({ url })
    });

    return review;
};

export const deleteReview = (reviewId) => async () => {
    const response = await csrfFetch(`/api/reviews/${reviewId}`, { method: "DELETE", });
    return await response.json();
};

export default function reviewsReducer(state = null, action) {
    switch (action.type) {
        case GET_REVIEWS:
            return action.reviews;
        default:
            return state;
    }
};
