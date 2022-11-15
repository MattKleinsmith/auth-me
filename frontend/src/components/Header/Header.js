import React from 'react';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Header.css';
import Logo from './Logo';

function Navigation({ isLoaded }) {
    const sessionUser = useSelector(state => state.session.user);
    return (
        <div className="standardPadding">
            <div className="header">
                <Logo />
                <span>{isLoaded && <div className="rightHeader"><button className="becomeAHost">Become a Host</button> <ProfileButton user={sessionUser} /></div>}</span>
            </div>
        </div>
    );
}

export default Navigation;
