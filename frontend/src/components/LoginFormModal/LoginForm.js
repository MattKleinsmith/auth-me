import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import { setLoginModal } from "../../store/ui";
import "./LoginForm.css";

function LoginForm() {
    const dispatch = useDispatch();
    const [credential, setCredential] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors([]);
        return dispatch(sessionActions.login({ credential, password }))
            .then(() => dispatch(setLoginModal(false)))
            .catch(error => setErrors([error.message]));
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="header">
                <div>Log in</div>
            </div>
            <ul>
                {errors.map((error, idx) => (
                    <li key={idx}>{error}</li>
                ))}
            </ul>
            <label>
                Username or Email
                <input
                    type="text"
                    value={credential}
                    onChange={(e) => setCredential(e.target.value)}
                    required
                />
            </label>
            <label>
                Password
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </label>
            <div className="logInButtons">
                <button type="submit">Log In</button>
                <button type="submit" onClick={() => {
                    setCredential("Demo-lition");
                    setPassword("password");
                }}>Demo user log in</button>
            </div>

        </form>
    );
}

export default LoginForm;
