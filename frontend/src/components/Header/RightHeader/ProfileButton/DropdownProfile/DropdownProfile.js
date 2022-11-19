import "./DropdownProfile.css";
import DropdownLoggedIn from "./DropdownLoggedIn";
import DropdownLoggedOut from "./DropdownLoggedOut";

export default function DropdownProfile({ user, ui }) {
    return <>
        <div
            className={"profile-dropdown"}
            style={{ marginRight: (+ui.padding.right.split('px')[0] - 66) + "px" }}
        >
            {user ? <DropdownLoggedIn user={user} /> : <DropdownLoggedOut />}
        </div>
    </>
}
