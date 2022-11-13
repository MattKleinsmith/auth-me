import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import * as sessionActions from '../../store/session';
import "./ProfileButton.css";
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';

function ProfileButton({ user }) {
    const dispatch = useDispatch();
    const [showMenu, setShowMenu] = useState(false);
    const ui = useSelector(state => state.ui);

    const openMenu = () => {
        if (showMenu) return;
        setShowMenu(true);
    };

    useEffect(() => {
        if (!showMenu) return;

        const closeMenu = () => {
            setShowMenu(false);
        };

        document.addEventListener('click', closeMenu);

        return () => document.removeEventListener("click", closeMenu);
    }, [showMenu]);

    const logout = (e) => {
        e.preventDefault();
        dispatch(sessionActions.logout());
    };

    let menu;
    if (user) {
        menu = <>
            <li>{user.username}</li>
            <li>{user.email}</li>
            <li>
                <button onClick={logout}>Log Out</button>
            </li>
        </>
    } else {
        menu = <>
            <LoginFormModal />
            <SignupFormModal />
        </>
    }

    return (
        <>
            <button onClick={openMenu} className="profileButton">
                <i className="fa-solid fa-bars"></i>
                <i className="fas fa-user-circle" />
            </button>
            {showMenu && (
                <ul className="profile-dropdown">
                    {menu}
                </ul>
            )}
            {ui.showLoginModal && <LoginFormModal />}
            {ui.showSignupModal && <SignupFormModal />}
        </>
    );
}

export default ProfileButton;
