import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import * as sessionActions from "../../store/session";
import { getSpotDetails } from "../../store/spotDetails";
import { getSpots, postSpot, putSpot } from "../../store/spots";
import { setSpotForEditing, setSpotModal } from "../../store/ui";
import './SpotForm.css';

export default function SpotForm({ spot }) {
    const [address, setAddress] = useState(spot ? spot.address : "");
    const [city, setCity] = useState(spot ? spot.city : "");
    const [state, setState] = useState(spot ? spot.state : "");
    const [country, setCountry] = useState(spot ? spot.country : "United States");
    const [name, setName] = useState(spot ? spot.name : "");
    const [description, setDescription] = useState(spot ? spot.description : "");
    const [price, setPrice] = useState(spot ? spot.price : "");

    const [errors, setErrors] = useState([]);

    const dispatch = useDispatch();

    const history = useHistory();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors([]);
        try {
            const body = { address, city, state, country, name, description, price };
            if (spot) {
                await dispatch(putSpot(spot.id, body));
                dispatch(getSpotDetails(spot.id));
                dispatch(setSpotForEditing(null));
            } else {
                const spot = await dispatch(postSpot(body));
                history.push("/");
                history.push("/spots/" + spot.id);
            }
            dispatch(setSpotModal(false));
        }
        catch (errors) {
            setErrors(Object.values(errors.errors))
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h1>{spot ? "Edit" : "Create"} a spot</h1>
            <ul>
                {errors.map((error, idx) => <li key={idx}>{error}</li>)}
            </ul>
            <label>
                Address{" "}
                <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    required
                />
            </label>
            <label>
                City{" "}
                <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    required
                />
            </label>
            <label>
                State{" "}
                <input
                    type="text"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    required
                />
            </label>
            <label>
                Country{" "}
                <input
                    type="text"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    required
                />
            </label>
            <label>
                Name{" "}
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
            </label>
            <label>
                Description{" "}
                <input
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                />
            </label>
            <label>
                Price{" "}
                <input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required
                />
            </label>
            <button type="submit">{spot ? "Edit" : "Create"} spot</button>
        </form>
    );
}