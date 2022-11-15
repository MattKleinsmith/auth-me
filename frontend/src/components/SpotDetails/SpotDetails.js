import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import BookingForm from "./BookingForm";
import "./SpotDetails.css";
import SpotDetailsHeader from "./SpotDetailsHeader";
import { getSpotDetails } from "../../store/spotDetails";
import { setRootWrapperPadding } from "../../utils";

export default function SpotDetails() {
    const { spotId } = useParams();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getSpotDetails(spotId));
        setRootWrapperPadding(false);
    }, [dispatch]);

    const spotDetails = useSelector(state => state.spotDetails);
    if (!spotDetails) return;

    const previewImageUrl = spotDetails.SpotImages?.find(image => image.preview).url;

    return (
        <div className="SpotDetails standardPadding">
            <SpotDetailsHeader spot={spotDetails} />
            <div className="SpotDetailsImageGrid">
                <img className="previewImage" src={previewImageUrl} alt={previewImageUrl} />
                {spotDetails.SpotImages?.filter(image => !image.preview).map((image, i) => <div className={`otherImageDiv div_${i}`} key={i}><img className={`otherImageImg img_${i}`} src={image.url} alt={image.url} /></div>)}
            </div>
            <div className="SpotDetailsBody">
                <h2>Hosted by {spotDetails.Owner?.firstName}</h2>
                <div className="DescBook">
                    <div className="SpotDetailsDescription">{spotDetails.description}</div>
                    <BookingForm spot={spotDetails} />
                </div>
            </div>
        </div>
    );
}
