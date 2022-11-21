import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import './Header.css';
import Logo from './Logo';
import RightHeader from './RightHeader/RightHeader'

export default function Header({ className }) {
    const ui = useSelector(state => state.ui);
    const history = useHistory();
    console.log("on spot details?", history.location.pathname.includes("spot"));
    return (
        <div className="headerWrapper" style={{ position: ui.headerPosition }}>
            <div className={className}>
                <div className="header">
                    <Logo />
                    <RightHeader />
                </div>
            </div>
            {className && <div className="line"></div>}
        </div >
    );
}
