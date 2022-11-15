const SET_LOGIN_MODAL = 'ui/setLoginModal';
const SET_SIGNUP_MODAL = 'ui/setSignupModal';
const SET_PADDING = 'ui/setPadding';

export const setLoginModal = showLoginModal => { return { type: SET_LOGIN_MODAL, showLoginModal } };
export const setSignupModal = showSignupModal => { return { type: SET_SIGNUP_MODAL, showSignupModal } };
export const setPadding = (left, right) => { return { type: SET_PADDING, padding: { left, right } } };

export default function uiReducer(state = {}, action) {
    const newState = { ...state };
    switch (action.type) {
        case SET_LOGIN_MODAL:
            newState.showLoginModal = action.showLoginModal;
        case SET_SIGNUP_MODAL:
            newState.showSignupModal = action.showSignupModal;
        case SET_PADDING:
            newState.padding = action.padding;
        default:
            return newState;
    }
};
