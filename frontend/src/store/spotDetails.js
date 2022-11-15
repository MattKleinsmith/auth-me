import { csrfFetch } from './csrf';

const GET_SPOT_DETAILS = 'spotDetails/GET_SPOT_DETAILS';

export const getSpotDetails = spotId => async dispatch => {
    const response = await csrfFetch(`/api/spots/${spotId}`);

    if (response.ok) {
        const spotDetails = await response.json();
        dispatch({ type: GET_SPOT_DETAILS, spotDetails });
    }
    return response;
};

export default function spotDetailsReducer(state = {}, action) {
    switch (action.type) {
        case GET_SPOT_DETAILS:
            return action.spotDetails;
        default:
            return state;
    }
};
