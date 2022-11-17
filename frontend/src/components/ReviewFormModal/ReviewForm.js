import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setReviewModal } from "../../store/ui";
import { useHistory } from "react-router-dom";
import "./ReviewForm.css";
import { postReview } from "../../store/reviews";

export default function ReviewForm() {
    const [review, setReview] = useState("");
    const [stars, setStars] = useState("");

    const [errors, setErrors] = useState([]);
    const dispatch = useDispatch();
    const history = useHistory();

    const spot = useSelector(state => state.spotDetails);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors([]);
        try {
            const body = { review, stars };
            await dispatch(postReview(spot.id, body));
        }
        catch (errors) {
            console.log(errors);
            setErrors([errors.message])
        }
    };

    return (
        <form className="reviewForm" onSubmit={handleSubmit}>
            <h4>Leave a review</h4>
            {errors.length > 0 && <ul>
                {errors.map((error, idx) => <li key={idx}>{error}</li>)}
            </ul>}
            <label>
                Stars{" "}
                <select name='rating' onChange={e => setStars(e.target.value)} value={stars} required>
                    <option value='' disabled>Select a rating</option>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                </select>
            </label>
            <label>
                Review{" "}
                <textarea
                    value={review}
                    onChange={(e) => setReview(e.target.value)}
                    required
                />
            </label>

            <button type="submit">Leave a  review</button>
        </form>
    );
}
