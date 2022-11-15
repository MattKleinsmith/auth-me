import { csrfFetch } from './csrf';

const GET_SPOTS = 'spots/GET_SPOTS';
const POST_SPOT = 'spots/POST_SPOT';

export const getSpots = () => async dispatch => {
    const response = await csrfFetch('/api/spots');

    if (response.ok) {
        const data = await response.json();
        const spots = data.Spots;
        dispatch({ type: GET_SPOTS, spots });
    }
    return response;
};

export const postSpot = body => async dispatch => {
    body.lat = 100;
    body.lng = 100;
    const response = await csrfFetch('/api/spots', {
        method: "POST",
        body: JSON.stringify(body)
    });

    if (response.ok) {
        const spot = await response.json();
        dispatch({ type: POST_SPOT, spot });
        return spot;
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
        case POST_SPOT: {
            return { ...state, [action.spot.id]: action.spot };
        }
        default:
            return state;
    }
};
