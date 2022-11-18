import { BrowserRouter } from 'react-router-dom';
import { csrfFetch } from './csrf';

const SET_USER = 'session/setUser';

const setUser = user => { return { type: SET_USER, user } };

export const restoreUser = () => async dispatch => {
    try {
        const response = await csrfFetch('/api/session');
        const data = await response.json();
        dispatch(setUser(data));
        return response;
    } catch (errorResponse) {
        console.log("Couldn't restore user");
    }
};

export const login = credentials => async dispatch => {
    const response = await csrfFetch('/api/session', {
        method: 'POST',
        body: JSON.stringify(credentials),
    });

    if (response.ok) {
        const data = await response.json();
        dispatch(setUser(data));
    }
    return response;
};

export const logout = () => async (dispatch) => {
    const response = await csrfFetch('/api/session', { method: 'DELETE', });
    dispatch(setUser(null));
    return response;
};

export const signup = user => async (dispatch) => {
    const response = await csrfFetch("/api/users", {
        method: "POST",
        body: JSON.stringify(user)
    });
    if (response.ok) {
        const data = await response.json();
        dispatch(setUser(data));
    }
    return response;
};

export default function sessionReducer(state = { user: null }, action) {
    const newState = { ...state };
    switch (action.type) {
        case SET_USER:
            newState.user = action.user;
            return newState;
        default:
            return state;
    }
};
