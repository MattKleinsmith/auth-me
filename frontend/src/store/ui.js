const SET_LOGIN_MODAL = 'ui/setLoginModal';
const SET_SIGNUP_MODAL = 'ui/setSignupModal';
const SET_SPOT_MODAL = 'ui/setSpotModal';
const SET_REVIEW_MODAL = 'ui/setReviewModal';
const SET_EDIT_SPOT = 'ui/setSpotForEditing';
const SET_DELETE_SPOT_MODAL = 'ui/setDeleteSpotModal';
const SET_PADDING = 'ui/setPadding';
const SET_HEADER_POSITION = 'ui/setHeaderPosition';

export const setLoginModal = showLoginModal => { return { type: SET_LOGIN_MODAL, showLoginModal } };
export const setSignupModal = showSignupModal => { return { type: SET_SIGNUP_MODAL, showSignupModal } };
export const setSpotModal = showSpotModal => { return { type: SET_SPOT_MODAL, showSpotModal } };
export const setReviewModal = showReviewModal => { return { type: SET_REVIEW_MODAL, showReviewModal } };
export const setSpotForEditing = spot => { return { type: SET_EDIT_SPOT, spot } };
export const setDeleteSpotModal = showDeleteSpotModal => { return { type: SET_DELETE_SPOT_MODAL, showDeleteSpotModal } };

const padding = { left: "40px", right: "40px" };
export const setPadding = (left, right) => {
    if (window.innerWidth < 1920) {
        left = padding.left;
        right = padding.right;
    }
    return { type: SET_PADDING, padding: { left, right } }
};
export const resetPadding = () => { return { type: SET_PADDING, padding } };
export const setHeaderPosition = (headerPosition) => { return { type: SET_HEADER_POSITION, headerPosition } };

export default function uiReducer(state = { padding }, action) {
    switch (action.type) {
        case SET_LOGIN_MODAL:
            return { ...state, showLoginModal: action.showLoginModal };
        case SET_SIGNUP_MODAL:
            return { ...state, showSignupModal: action.showSignupModal };
        case SET_SPOT_MODAL:
            return { ...state, showSpotModal: action.showSpotModal };
        case SET_REVIEW_MODAL:
            return { ...state, showReviewModal: action.showReviewModal };
        case SET_EDIT_SPOT:
            return { ...state, spot: action.spot };
        case SET_DELETE_SPOT_MODAL:
            return { ...state, showDeleteSpotModal: action.showDeleteSpotModal };
        case SET_PADDING:
            return { ...state, padding: action.padding };
        case SET_HEADER_POSITION:
            return { ...state, headerPosition: action.headerPosition };
        default:
            return state;
    }
};
