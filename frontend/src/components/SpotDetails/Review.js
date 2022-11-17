import { useDispatch } from "react-redux";
import { deleteReview } from "../../store/reviews";
import { useHistory } from "react-router-dom";

export default function Review({ user, review }) {
    const dispatch = useDispatch();
    const history = useHistory();
    const onDeleteClick = async () => {
        await dispatch(deleteReview(review));

        // TODO: Debug useSelector's lack of re-render instead of forcing it like this
        // history.push("/");
        // history.push(`/spots/${review.spotId}`);
    }
    return <div className="review">
        <div className="user">
            <h4>{review.User.firstName}</h4>
            {user.id === review.User.id && <button onClick={onDeleteClick}>Delete review</button>}
        </div>
        <p>{review.review}</p>
    </div>
}
