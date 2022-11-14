import SpotGridItem from "./SpotGridItem";
import "./SpotGrid.css";
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from "react";
import { getSpots } from "../../store/spots";

export default function SpotGrid() {
    const dispatch = useDispatch();
    const spots = useSelector(state => Object.values(state.spots));
    console.log(spots);
    useEffect(() => {
        dispatch(getSpots());
    }, [dispatch])
    return <div className="SpotGrid">{spots.map((spot, i) => <SpotGridItem key={i} spot={spot} />)}</div>
}
