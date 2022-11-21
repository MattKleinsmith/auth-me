import "./RightHeader.css";
import { useDispatch, useSelector } from "react-redux";
import { setSpotModal } from '../../../store/ui';
import ProfileButton from "./ProfileButton/ProfileButton";

export default function RightHeader() {
    const sessionUser = useSelector(state => state.session.user);
    const dispatch = useDispatch();
    return <span>
        {<div className="rightHeader">
            {sessionUser && <button
                className="createASpot button"
                onClick={() => dispatch(setSpotModal(true))}>Create a Spot
            </button>}
            <ProfileButton user={sessionUser} />
        </div>}
    </span>
}
