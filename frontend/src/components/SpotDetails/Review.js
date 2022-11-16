import "./Review.css";

export default function Review({ review }) {
    return <div className="review">
        <h4>{review.User.firstName}</h4>
        <p>{review.review}</p>
    </div>
}
