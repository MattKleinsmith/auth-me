import { Link } from 'react-router-dom';

export default function Logo() {
    return (
        <Link exact="true" to="/" style={{ textDecoration: 'none' }} className="leftHeader">
            <img height="32px" src="./logo.png" />
            <span id="logo" >BedNoBreakfast</span>
        </Link>
    )
}
