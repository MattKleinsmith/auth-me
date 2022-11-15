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

    return (
        <div className="SpotDetails standardPadding">
            <SpotDetailsHeader spot={spotDetails} />
            <div className="SpotDetailsImageGrid">images</div>
            <div className="SpotDetailsBody">
                <div>{spotDetails.description}</div>
                <BookingForm />
            </div>
        </div>
    );
}
