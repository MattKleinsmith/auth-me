import { useDispatch, useSelector } from "react-redux";
import { setSpotForEditing, setDeleteSpotModal, setSpotModal } from "../../store/ui";
import "./SpotDetailsHeader.css";

export default function SpotDetailsHeader({ spot }) {
    const user = useSelector(state => state.session.user);
    const dispatch = useDispatch();

    const onEditClick = () => {
        dispatch(setSpotForEditing(spot));
        dispatch(setSpotModal(true));
    };

    const onDeleteClick = () => {
        dispatch(setDeleteSpotModal(true));
    };

    return (
        <div className="SpotDetailsHeader">
            <h1>{spot.name}</h1>
            <div className="SpotsDetailsRatingLocation">
                <div>
                    {spot.avgStarRating && <i className="fa-solid fa-star SpotGridItemStar" />} {spot.avgStarRating} {spot.avgStarRating && "·"} {spot.numReviews} review{spot.numReviews === 1 ? "" : "s"} · {spot.city}, {spot.state}, {spot.country}
                </div>
                {user && user.id === spot.ownerId && <div className="spotButtons">
                    <button onClick={onEditClick}>Edit spot</button>
                    <button className="spotDetailsDelete" onClick={onDeleteClick}>Delete spot</button>
                </div>}
            </div>
        </div>
    );
}
