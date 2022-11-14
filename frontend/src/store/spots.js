import { csrfFetch } from './csrf';

const GET_SPOTS = 'spots/GET_SPOTS';

export const getSpots = () => async dispatch => {
    const response = await csrfFetch('/api/spots');

    if (response.ok) {
        const spots = await response.json();
        dispatch({ type: GET_SPOTS, spots });
    }
    return response;
};

export default function spotsReducer(state = {}, action) {
    switch (action.type) {
        case GET_SPOTS:
            return action.spots.Spots.reduce((accm, spot) => {
                accm[spot.id] = spot;
                return accm;
            }, {});
        default:
            return state;
    }
};
