import { useDispatch } from 'react-redux';
import { logout } from '../../../../../store/session';

export default function DropdownLoggedIn({ user }) {
    const dispatch = useDispatch();
    return <>
        <div className="dropdownInfo">Hello, {user.firstName}!</div>
        <div className="dropdownInfo">{user.username}</div>
        <div className="dropdownInfo">{user.email}</div>
        <div className="dropdownButton bold" onClick={() => dispatch(logout())}>Log Out</div>
    </>
}
