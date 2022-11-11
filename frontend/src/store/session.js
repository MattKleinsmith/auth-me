import { csrfFetch } from './csrf';

const SET_USER = 'session/setUser';

const setUser = user => { return { type: SET_USER, user } };

export const login = credentials => async dispatch => {
    const response = await csrfFetch('/api/session', {
        method: 'POST',
        body: JSON.stringify(credentials),
    });

    if (response.ok) {
        const data = await response.json();
        dispatch(setUser(data));
    }
};

export default sessionReducer = (state = { user: null }, action) => {
    const newState = { ...state };
    switch (action.type) {
        case SET_USER:
            newState.user = action.user;
            return newState;
        default:
            return state;
    }
};
