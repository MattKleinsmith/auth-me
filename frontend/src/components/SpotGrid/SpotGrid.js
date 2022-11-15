import SpotGridItem from "./SpotGridItem";
import "./SpotGrid.css";
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from "react";
import { getSpots } from "../../store/spots";
import { NavLink } from "react-router-dom";
import { clearSpotDetails } from "../../store/spotDetails";
import { setPadding } from "../../store/ui";

export default function SpotGrid() {
    const dispatch = useDispatch();
    const spots = useSelector(state => Object.values(state.spots));
    const padding = useSelector(state => state.ui.padding);
    useEffect(() => {
        dispatch(getSpots());
        dispatch(clearSpotDetails());
        dispatch(setPadding("70px", "70px"));
    }, [dispatch]);

    return <div className="SpotGrid" style={{ paddingLeft: padding.left, paddingRight: padding.right }}>{
        spots.map((spot, i) => <NavLink key={i} to={`/spots/${spot.id}`} style={{ textDecoration: 'none' }}> <SpotGridItem spot={spot} /></NavLink>)
    }</div >
}
