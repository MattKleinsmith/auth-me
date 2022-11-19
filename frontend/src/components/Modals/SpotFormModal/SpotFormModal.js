import { useDispatch, useSelector } from 'react-redux';
import { Modal } from '../../../context/Modal';
import { setSpotModal, setSpotForEditing } from '../../../store/ui';
import SpotForm from './SpotForm';

function SpotFormModal({ spot }) {
    const dispatch = useDispatch();
    const showSpotModal = useSelector(state => state.ui.showSpotModal);
    if (!showSpotModal) return;

    return <Modal onClose={() => { dispatch(setSpotModal(false)); dispatch(setSpotForEditing(null)) }}>
        <SpotForm spot={spot} />
    </Modal>;
}

export default SpotFormModal;
