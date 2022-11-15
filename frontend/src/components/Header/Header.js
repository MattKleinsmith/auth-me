import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Header.css';
import Logo from './Logo';
import { setCreateSpotModal } from '../../store/ui';
import CreateSpotFormModal from '../CreateSpotModal';

function Navigation({ isLoaded }) {
    const sessionUser = useSelector(state => state.session.user);
    const ui = useSelector(state => state.ui);
    const dispatch = useDispatch();
    return (
        <>
            <div style={{ paddingLeft: ui.padding.left, paddingRight: ui.padding.right }}>
                <div className="header">
                    <Logo />
                    <span>{<div className="rightHeader">{sessionUser && <button className="becomeAHost" onClick={() => dispatch(setCreateSpotModal(true))}>Create a Spot</button>}<ProfileButton user={sessionUser} /></div>}</span>
                </div>
            </div>
            {ui.showCreateSpotModal && <CreateSpotFormModal />}
        </>
    );
}

export default Navigation;
