import { useDispatch, useSelector } from 'react-redux';
import { Modal } from '../../context/Modal';
import { setCreateSpotModal } from '../../store/ui';
import CreateSpotForm from './CreateSpotForm';

function CreateSpotFormModal() {
    const dispatch = useDispatch();
    const showCreateSpotModal = useSelector(state => state.ui.showCreateSpotModal);
    if (!showCreateSpotModal) return;

    return <Modal onClose={() => dispatch(setCreateSpotModal(false))}>
        <CreateSpotForm />
    </Modal>;
}

export default CreateSpotFormModal;
