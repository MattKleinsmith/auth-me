import React from 'react';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Header.css';
import Logo from './Logo';

function Navigation({ isLoaded }) {
    const sessionUser = useSelector(state => state.session.user);
    return (
        <>
            <div className="header">
                <Logo />
                <span>{isLoaded && <ProfileButton user={sessionUser} />}</span>
            </div>
        </>
    );
}

export default Navigation;
