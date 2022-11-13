import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import './Header.css';
import SignupFormModal from '../SignupFormModal';

function Navigation({ isLoaded }) {
    const sessionUser = useSelector(state => state.session.user);

    let sessionLinks;
    if (sessionUser) {
        sessionLinks = (
            <ProfileButton user={sessionUser} />
        );
    } else {
        sessionLinks = (
            <>
                <LoginFormModal />
                <SignupFormModal />
            </>
        );
    }

    return (
        <>
            <div className="header">
                <Link exact to="/" style={{ textDecoration: 'none' }} className="leftHeader"><img height="32px" src="./logo.png" /><span id="logo" >BedNoBreakfast</span></Link>
                <span>{isLoaded && sessionLinks}</span>
            </div>
        </>
    );
}

export default Navigation;
