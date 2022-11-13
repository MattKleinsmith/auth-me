import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Header.css';

function Navigation({ isLoaded }) {
    const sessionUser = useSelector(state => state.session.user);
    return (
        <>
            <div className="header">
                <Link exact="true" to="/" style={{ textDecoration: 'none' }} className="leftHeader"><img height="32px" src="./logo.png" /><span id="logo" >BedNoBreakfast</span></Link>
                <span>{isLoaded && <ProfileButton user={sessionUser} />}</span>
            </div>
        </>
    );
}

export default Navigation;
