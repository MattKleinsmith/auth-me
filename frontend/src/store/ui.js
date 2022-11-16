const SET_LOGIN_MODAL = 'ui/setLoginModal';
const SET_SIGNUP_MODAL = 'ui/setSignupModal';
const SET_SPOT_MODAL = 'ui/setSpotModal';
const SET_EDIT_SPOT = 'ui/setSpotForEditing';
const SET_DELETE_SPOT_MODAL = 'ui/setDeleteSpotModal';
const SET_PADDING = 'ui/setPadding';

export const setLoginModal = showLoginModal => { return { type: SET_LOGIN_MODAL, showLoginModal } };
export const setSignupModal = showSignupModal => { return { type: SET_SIGNUP_MODAL, showSignupModal } };
export const setSpotModal = showSpotModal => { return { type: SET_SPOT_MODAL, showSpotModal } };
export const setSpotForEditing = spot => { return { type: SET_EDIT_SPOT, spot } };
export const setDeleteSpotModal = showDeleteSpotModal => { return { type: SET_DELETE_SPOT_MODAL, showDeleteSpotModal } };

const padding = { left: "70px", right: "70px" };
export const setPadding = (left, right) => { return { type: SET_PADDING, padding: { left, right } } };
export const resetPadding = () => { return { type: SET_PADDING, padding } };

export default function uiReducer(state = { padding }, action) {
    switch (action.type) {
        case SET_LOGIN_MODAL:
            return { ...state, showLoginModal: action.showLoginModal };
        case SET_SIGNUP_MODAL:
            return { ...state, showSignupModal: action.showSignupModal };
        case SET_SPOT_MODAL:
            return { ...state, showSpotModal: action.showSpotModal };
        case SET_EDIT_SPOT:
            return { ...state, spot: action.spot };
        case SET_DELETE_SPOT_MODAL:
            return { ...state, showDeleteSpotModal: action.showDeleteSpotModal };
        case SET_PADDING:
            return { ...state, padding: action.padding };
        default:
            return state;
    }
};
