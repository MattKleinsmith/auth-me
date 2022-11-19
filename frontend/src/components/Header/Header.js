import './Header.css';

import { useDispatch, useSelector } from 'react-redux';
import { setSpotModal } from '../../store/ui';

import Logo from './Logo';
import ProfileButton from './ProfileButton';

export default function Header() {
    const sessionUser = useSelector(state => state.session.user);
    const ui = useSelector(state => state.ui);
    const dispatch = useDispatch();
    return (
        <div className="headerWrapper" style={{ position: ui.headerPosition }}>
            <div style={{ paddingLeft: ui.padding.left, paddingRight: ui.padding.right }}>
                <div className="header">
                    <Logo />
                    <span>
                        {<div className="rightHeader">
                            {sessionUser &&
                                <button
                                    className="becomeAHost button"
                                    onClick={() => dispatch(setSpotModal(true))}>Create a Spot
                                </button>}
                            <ProfileButton user={sessionUser} />
                        </div>}
                    </span>
                </div>
            </div>
            <div className="line"></div>
        </div>
    );
}
