import SpotFormModal from './SpotFormModal';
import ReviewFormModal from './ReviewFormModal';
import DeleteSpotForm from './DeleteSpotFormModal';
import { useSelector } from 'react-redux';

export default function Modals() {
    const ui = useSelector(state => state.ui);
    return <>
        {ui.showSpotModal && <SpotFormModal spot={ui.spot} />}
        {ui.showReviewModal && <ReviewFormModal />}
        {ui.showDeleteSpotModal && <DeleteSpotForm />}
    </>
}
