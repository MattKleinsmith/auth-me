import SpotGridItem from "./SpotGridItem";
import "./SpotGrid.css";
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from "react";
import { getSpots } from "../../store/spots";
import { setRootWrapperPadding } from "../../utils";
import { NavLink } from "react-router-dom";

export default function SpotGrid() {
    const dispatch = useDispatch();
    const spots = useSelector(state => Object.values(state.spots));
    useEffect(() => {
        dispatch(getSpots());
        setRootWrapperPadding(true);
    }, [dispatch]);

    return <div className="SpotGrid standardPadding">{
        spots.map((spot, i) => <NavLink to={`/spots/${spot.id}`} > <SpotGridItem key={i} spot={spot} /></NavLink>)
    }</div >
}
