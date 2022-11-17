import Review from "./Review";
import ReviewHeader from "./ReviewHeader";
import "./Reviews.css";

export default function Reviews({ spot, reviews }) {
    if (!reviews) return;
    return <div>
        <ReviewHeader spot={spot} />
        <div className="reviews">
            {reviews.map((review, i) => <Review key={i} review={review} />)}
        </div>
    </div>
}
