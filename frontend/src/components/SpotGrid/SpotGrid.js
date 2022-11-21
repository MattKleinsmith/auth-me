import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from "react";

import "./SpotGrid.css";
import { getSpots } from "../../store/spots";
import SpotGridItem from "./SpotGridItem";
import { clearSpotDetails } from "../../store/spotDetails";
import { resetPadding, setHeaderPosition } from "../../store/ui";
import Header from "../Header/Header";

export default function SpotGrid() {
    const dispatch = useDispatch();
    const spots = useSelector(state => Object.values(state.spots));
    const padding = useSelector(state => state.ui.padding);
    useEffect(() => {
        dispatch(getSpots());
        dispatch(clearSpotDetails());
        dispatch(resetPadding());
        dispatch(setHeaderPosition("fixed"));
    }, [dispatch]);

    return <>
        <Header className="homepageHeader" />
        <div className="SpotGrid">
            {spots.map((spot, i) =>
                <NavLink key={i} to={`/spots/${spot.id}`} style={{ textDecoration: 'none' }}>
                    <SpotGridItem spot={spot} />
                </NavLink>)
            }</div >
    </>

}
