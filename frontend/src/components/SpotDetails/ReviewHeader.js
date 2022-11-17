import { useDispatch } from "react-redux"
import { setReviewModal } from "../../store/ui";

export default function ReviewHeader({ spot, userReviewed }) {
    const dispatch = useDispatch();

    const onReviewButtonClick = () => {
        dispatch(setReviewModal(true))
    }

    return <div className="reviewHeader">
        <h2>{spot.avgStarRating && <i className="fa-solid fa-star star" />} {spot.avgStarRating} {spot.avgStarRating && "·"} {spot.numReviews} review{spot.numReviews === 1 ? "" : "s"}</h2>
        {!userReviewed && <button className="createReviewButton" onClick={onReviewButtonClick}>Leave a review</button>}
    </div>
}
