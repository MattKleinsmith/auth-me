import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import './Header.css';
import Logo from './Logo';
import RightHeader from './RightHeader/RightHeader'

export default function Header() {
    const ui = useSelector(state => state.ui);
    const history = useHistory();
    console.log("on spot details?", history.location.pathname.includes("spot"));
    return (
        <div className="headerWrapper" style={{ position: ui.headerPosition }}>
            <div className="homepagePadding" style=
                {
                    history.location.pathname.includes("spot") ?
                        { paddingLeft: ui.padding.left, paddingRight: ui.padding.right } :
                        {}
                }>
                <div className="header">
                    <Logo />
                    <RightHeader />
                </div>
            </div>
            <div className="line"></div>
        </div >
    );
}
