const SET_LOGIN_MODAL = 'ui/setLoginModal';
const SET_SIGNUP_MODAL = 'ui/setSignupModal';

export const setLoginModal = showLoginModal => { return { type: SET_LOGIN_MODAL, showLoginModal } };
export const setSignupModal = showSignupModal => { return { type: SET_SIGNUP_MODAL, showSignupModal } };

export default function uiReducer(state = {}, action) {
    const newState = { ...state };
    switch (action.type) {
        case SET_LOGIN_MODAL:
            newState.showLoginModal = action.showLoginModal;
        case SET_SIGNUP_MODAL:
            newState.showSignupModal = action.showSignupModal;
        default:
            return newState;
    }
};
