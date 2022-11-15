const SET_LOGIN_MODAL = 'ui/setLoginModal';
const SET_SIGNUP_MODAL = 'ui/setSignupModal';
const SET_CREATE_SPOT_MODAL = 'ui/setCreateSpotModal';
const SET_PADDING = 'ui/setPadding';

export const setLoginModal = showLoginModal => { return { type: SET_LOGIN_MODAL, showLoginModal } };
export const setSignupModal = showSignupModal => { return { type: SET_SIGNUP_MODAL, showSignupModal } };
export const setCreateSpotModal = showCreateSpotModal => { return { type: SET_CREATE_SPOT_MODAL, showCreateSpotModal } };
export const setPadding = (left, right) => { return { type: SET_PADDING, padding: { left, right } } };

export default function uiReducer(state = { padding: { left: "70px", right: "70px" } }, action) {
    switch (action.type) {
        case SET_LOGIN_MODAL:
            return { ...state, showLoginModal: action.showLoginModal };
        case SET_SIGNUP_MODAL:
            return { ...state, showSignupModal: action.showSignupModal };
        case SET_CREATE_SPOT_MODAL:
            return { ...state, showCreateSpotModal: action.showCreateSpotModal };
        case SET_PADDING:
            return { ...state, padding: action.padding };
        default:
            return state;
    }
};
