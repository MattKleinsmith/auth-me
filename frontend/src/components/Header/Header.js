import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Header.css';
import Logo from './Logo';
import { setSpotModal } from '../../store/ui';
import SpotFormModal from '../SpotFormModal';

function Header() {
    const sessionUser = useSelector(state => state.session.user);
    const ui = useSelector(state => state.ui);
    const dispatch = useDispatch();
    return (
        <div className="headerWrapper">
            <div style={{ paddingLeft: ui.padding.left, paddingRight: ui.padding.right }}>
                <div className="header">
                    <Logo />
                    <span>{<div className="rightHeader">{sessionUser && <button className="becomeAHost" onClick={() => dispatch(setSpotModal(true))}>Create a Spot</button>}<ProfileButton user={sessionUser} /></div>}</span>
                </div>
            </div>
            <div className="line"></div>
            {ui.showSpotModal && <SpotFormModal spot={ui.spot} />}
        </div>
    );
}

export default Header;
