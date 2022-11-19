import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import "./SpotDetails.css";
import BookingForm from "./BookingForm";
import SpotDetailsHeader from "./SpotDetailsHeader";
import { getSpotDetails } from "../../store/spotDetails";
import { setHeaderPosition, setPadding } from "../../store/ui";
import Reviews from "./Reviews";
import { getReviews } from "../../store/reviews";

export default function SpotDetails() {
    const { spotId } = useParams();
    const dispatch = useDispatch();

    const reviews = useSelector(state => state.reviews);
    const padding = useSelector(state => state.ui.padding);
    const spotDetails = useSelector(state => state.spotDetails);

    useEffect(() => {
        dispatch(getSpotDetails(spotId));
        dispatch(setPadding("384px", "380px"));
        dispatch(setHeaderPosition("static"));
        dispatch(getReviews(spotId));

        const resize = () => {
            dispatch(setPadding("384px", "380px"));
        }
        window.addEventListener('resize', resize);
        return () => {
            window.removeEventListener('resize', resize)
        }
    }, [dispatch]);

    if (!spotDetails) {
        return <div className="SpotDetails" style={{ paddingLeft: padding.left, paddingRight: padding.right }}>
            <h1>{!Number.isNaN(+spotId) ? "Spot" : "Resource"} not found</h1>
        </div>
    };

    const previewImageUrl = spotDetails.SpotImages?.find(image => image.preview)?.url;
    const nonPreviwImages = spotDetails.SpotImages.filter((image, i) => !image.preview);

    return (
        <div className="SpotDetailsWrapper">
            <div className="SpotDetails spotDetailsPadding" >
                {/* <div className="SpotDetails" style={{ paddingLeft: padding.left, paddingRight: padding.right }}> */}
                <SpotDetailsHeader spot={spotDetails} />

                <div className="SpotImages">

                    <img className="SpotImagesLeft" src={previewImageUrl} alt={previewImageUrl} />

                    <div className="SpotImagesRight">

                        <div className="SpotImagesRightRow">
                            {nonPreviwImages.filter((image, i) => i <= 1)
                                .map((image, i) => <img src={image.url} alt={image.url} key={i} />)}
                        </div>

                        <div className="SpotImagesRightRow">
                            {nonPreviwImages.filter((image, i) => i >= 2)
                                .map((image, i) => <img src={image.url} alt={image.url} key={i} />)}
                        </div>

                    </div>

                </div>

                <div className="SpotDetailsBody">
                    <h2>Hosted by {spotDetails.Owner?.firstName}</h2>
                    <div className="SpotDetailsLine"></div>
                    <div className="DescBook">
                        <div className="SpotDetailsDescription">{spotDetails.description}</div>
                        <BookingForm spot={spotDetails} />
                    </div>
                    <div className="SpotDetailsLine2"></div>
                </div>
                <Reviews spot={spotDetails} reviews={reviews} />
            </div>
        </div>
    );
}
