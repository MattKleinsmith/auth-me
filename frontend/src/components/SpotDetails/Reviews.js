import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getReviews } from "../../store/reviews";
import Review from "./Review";
import ReviewHeader from "./ReviewHeader";
import "./Reviews.css";

export default function Reviews({ spot }) {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getReviews(spot.id));
    }, [dispatch])
    const reviews = useSelector(state => state.reviews);
    if (!reviews) return;
    return <div>
        <ReviewHeader spot={spot} />
        <div className="reviews">
            {reviews.map((review, i) => <Review key={i} review={review} />)}
        </div>
    </div>
}
