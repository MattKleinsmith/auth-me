import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import * as sessionActions from "../../store/session";
import { postSpot } from "../../store/spots";
import { setCreateSpotModal } from "../../store/ui";
import './CreateSpotForm.css';

export default function SignupForm() {
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [country, setCountry] = useState("United States");
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");

    const [errors, setErrors] = useState([]);

    const dispatch = useDispatch();

    const history = useHistory();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors([]);
        try {
            const spot = await dispatch(postSpot({ address, city, state, country, name, description, price }))
            dispatch(setCreateSpotModal(false));
            console.log("NEW SPOT", spot);
            history.push("/spots/" + spot.id);
        }
        catch (errors) {
            setErrors(Object.values(errors.errors))
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h1>Create a spot</h1>
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
                    type="text"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required
                />
            </label>
            <button type="submit">Create spot</button>
        </form>
    );
}
