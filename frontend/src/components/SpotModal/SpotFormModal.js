import { useDispatch, useSelector } from 'react-redux';
import { Modal } from '../../context/Modal';
import { setSpotModal } from '../../store/ui';
import CreateSpotForm from './SpotForm';

function SpotFormModal({ isCreate }) {
    const dispatch = useDispatch();
    const showCreateSpotModal = useSelector(state => state.ui.showCreateSpotModal);
    if (!showCreateSpotModal) return;

    return <Modal onClose={() => dispatch(setSpotModal(false))}>
        <CreateSpotForm />
    </Modal>;
}

export default SpotFormModal;
