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
        <form className="loginForm" onSubmit={handleSubmit}>
            <div className="logInHeader">
                <img src="/images/x.png" onClick={() => dispatch(setLoginModal(false))} />
                <div>Log in</div>
            </div>
            <div className="line"></div>
            <div className="loginTitle">Welcome to BedNoBreakfast</div>
            <ul>
                {errors.map((error, idx) => (
                    <li key={idx}>{error}</li>
                ))}
            </ul>
            <input
                className="field firstField"
                type="text"
                value={credential}
                onChange={(e) => setCredential(e.target.value)}
                placeholder="Username or email"
                required
            />
            <input
                className="field lastField"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
            />
            <button type="submit" className="demoButton" onClick={() => {
                setCredential("Demo-lition");
                setPassword("password");
            }}>Log in as demo user</button>
            <button type="submit" className="loginButton">Continue</button>
        </form>
    );
}

export default LoginForm;
