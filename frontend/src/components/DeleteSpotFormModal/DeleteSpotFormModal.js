import { useDispatch, useSelector } from 'react-redux';
import { Modal } from '../../context/Modal';
import DeleteSpotForm from './DeleteSpotForm';
import { setDeleteSpotModal } from '../../store/ui';

function DeleteSpotFormModal() {
    const dispatch = useDispatch();
    const showDeleteSpotModal = useSelector(state => state.ui.showDeleteSpotModal);
    if (!showDeleteSpotModal) return;
    return <Modal onClose={() => dispatch(setDeleteSpotModal(false))}>
        <DeleteSpotForm />
    </Modal>
}

export default DeleteSpotFormModal;
