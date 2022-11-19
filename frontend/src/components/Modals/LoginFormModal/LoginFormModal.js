import { useDispatch, useSelector } from 'react-redux';
import { Modal } from '../../../context/Modal';
import { setLoginModal } from '../../../store/ui';
import LoginForm from './LoginForm';

function LoginFormModal() {
    const dispatch = useDispatch();
    const showLoginModal = useSelector(state => state.ui.showLoginModal);
    return showLoginModal ?
        (
            <Modal onClose={() => dispatch(setLoginModal(false))}>
                <LoginForm />
            </Modal>
        ) :
        (
            <div className="dropdownLoginButton" onClick={() => dispatch(setLoginModal(true))}>Log In</div>
        );
}

export default LoginFormModal;
