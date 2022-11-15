import { csrfFetch } from './csrf';

const GET_SPOTS = 'spots/GET_SPOTS';

export const getSpots = () => async dispatch => {
    const response = await csrfFetch('/api/spots');

    if (response.ok) {
        const data = await response.json();
        const spots = data.Spots;
        dispatch({ type: GET_SPOTS, spots });
    }
    return response;
};

export default function spotsReducer(state = {}, action) {
    switch (action.type) {
        case GET_SPOTS:
            return action.spots.reduce((spots, spot) => {
                spots[spot.id] = spot;
                return spots;
            }, {});
        default:
            return state;
    }
};
