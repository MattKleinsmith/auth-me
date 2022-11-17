import { csrfFetch } from './csrf';

const GET_REVIEWS = 'reviews/GET_REVIEWS';

export const getReviews = (spotId) => async dispatch => {
    const response = await csrfFetch(`/api/spots/${spotId}/reviews`);
    const body = await response.json();
    const reviews = body.Reviews;
    dispatch({ type: GET_REVIEWS, reviews });
    return response;
};

export const postReview = (spotId, body) => async () => {
    const response = await csrfFetch(`/api/spots/${spotId}/reviews`, {
        method: "POST",
        body: JSON.stringify(body)
    });
    return await response.json();
};

export const deleteReview = (review) => async (dispatch) => {
    const response = await csrfFetch(`/api/reviews/${review.id}`, { method: "DELETE", });
    await response.json()
    dispatch(getReviews(review.spotId));
};

export default function reviewsReducer(state = null, action) {
    switch (action.type) {
        case GET_REVIEWS:
            return action.reviews;
        default:
            return state;
    }
};
