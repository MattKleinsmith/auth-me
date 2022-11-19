import { useSelector } from 'react-redux';

import './Header.css';
import Logo from './Logo';
import RightHeader from './RightHeader/RightHeader'

export default function Header() {
    const ui = useSelector(state => state.ui);

    return (
        <div className="headerWrapper" style={{ position: ui.headerPosition }}>
            <div style={{ paddingLeft: ui.padding.left, paddingRight: ui.padding.right }}>
                <div className="header">
                    <Logo />
                    <RightHeader />
                </div>
            </div>
            <div className="line"></div>
        </div>
    );
}
