import { useSelector } from "react-redux";
import Review from "./Review";
import ReviewHeader from "./ReviewHeader";
import "./Reviews.css";

export default function Reviews({ spot, reviews }) {
    const user = useSelector(state => state.session.user);
    if (!reviews) return;
    return <div>
        <ReviewHeader spot={spot} />
        <div className="reviews">
            {reviews.map((review, i) => <Review key={i} review={review} user={user} />)}
        </div>
    </div>
}
