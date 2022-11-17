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

    const [imageUrl, setImageUrl] = useState("");

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
                const spot = await dispatch(postSpot(body, imageUrl));
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
        <form className="spotForm" onSubmit={handleSubmit}>
            <div className="spotHeader">
                <img src="/images/x.png" onClick={() => dispatch(setSpotModal(false))} />
                <div>{spot ? "Edit" : "Create"} a spot</div>
            </div>
            <div className="line"></div>
            <ul>
                {errors.map((error, idx) => <li key={idx}>{error}</li>)}
            </ul>
            <input
                className="field firstField"
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
                placeholder="Address"
            />
            <input
                className="field"
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                required
                placeholder="City"
            />
            <input
                className="field"
                type="text"
                value={state}
                onChange={(e) => setState(e.target.value)}
                required
                placeholder="State"
            />
            <input
                className="field"
                type="text"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                required
                placeholder="Country"
            />
            <input
                className="field"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                placeholder="Name"
            />
            <textarea
                className="field"
                style={{ height: "125px" }}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                placeholder="Description"
            />
            <input
                className={`field ${spot && "lastField"}`}
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
                placeholder="Price"
            />

            {!spot &&
                < input
                    className="field lastField"
                    type="text"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    required
                    placeholder="Image url"
                />}
            <button type="submit" className="spotButton">{spot ? "Edit" : "Create"} spot</button>
        </form>
    );
}
