import "./SpotDetailsHeader.css";

export default function SpotDetailsHeader({ spot }) {
    return (
        <div className="SpotDetailsHeader">
            <h1>{spot.name}</h1>
            <div className="SpotsDetailsRatingLocation"><i className="fa-solid fa-star SpotGridItemStar" /> {spot.avgStarRating} · {spot.numReviews} 49 reviews · {spot.city}, {spot.state}, {spot.country}</div>
            <div>{spot.name}</div>
        </div>
    );
}
