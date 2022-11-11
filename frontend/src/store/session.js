import { csrfFetch } from "./csrf";

const SET_USER = 'session/SET_USER';

const login = user => ({
    type: SET_USER,
    user
});

export const logout = () => ({
    type: SET_USER,
    user: null
});

export const postSession = (payload) => async dispatch => {
    const response = await csrfFetch(`/api/session`, {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    });

    if (response.ok) {
        const user = await response.json();
        dispatch(login(user));
        return user;
    }
};

const sessionReducer = (state = { user: null }, action) => {
    switch (action.type) {
        case SET_USER:
            return { ...state, user: action.user };
        default:
            return state;
    }
}

export default sessionReducer;
