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
            <div>{user.username}</div>
            <div>{user.email}</div>
            <button onClick={logout}>Log Out</button>
        </>
    } else {
        menu = <>
            <LoginFormModal />
            <SignupFormModal />
        </>
    }

    return (
        <div className="profileButtonWrapper">
            <button onClick={openMenu} className="profileButton">
                <i className="fa-solid fa-bars" />
                <i className="fas fa-user-circle" />
            </button>
            {showMenu && (
                <div className="profile-dropdown">
                    {menu}
                </div>
            )}
            {ui.showLoginModal && <LoginFormModal />}
            {ui.showSignupModal && <SignupFormModal />}
        </ div>
    );
}

export default ProfileButton;
