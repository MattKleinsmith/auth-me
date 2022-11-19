import SpotFormModal from './SpotFormModal/SpotFormModal';
import ReviewFormModal from './ReviewFormModal/ReviewFormModal';
import DeleteSpotForm from './DeleteSpotFormModal/DeleteSpotFormModal';
import LoginFormModal from './LoginFormModal/LoginFormModal';
import SignupFormModal from './SignupFormModal/SignupFormModal';
import { useSelector } from 'react-redux';

export default function Modals() {
    const ui = useSelector(state => state.ui);
    return <>
        {ui.showLoginModal && <LoginFormModal />}
        {ui.showSignupModal && <SignupFormModal />}
        {ui.showDeleteSpotModal && <DeleteSpotForm />}
        {ui.showSpotModal && <SpotFormModal spot={ui.spot} />}
        {ui.showReviewModal && <ReviewFormModal />}
    </>
}
