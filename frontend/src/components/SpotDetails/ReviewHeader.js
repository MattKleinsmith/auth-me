export default function ReviewHeader({ spot }) {
    return <h2>{spot.avgStarRating && <i className="fa-solid fa-star star" />} {spot.avgStarRating} {spot.avgStarRating && "·"} {spot.numReviews} review{spot.numReviews === 1 ? "" : "s"}</h2>
}
