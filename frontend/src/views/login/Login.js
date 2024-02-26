import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginCall } from '../../actions/AuthAction';
import { useNavigate } from 'react-router-dom';
import "./login.css";

export default function Login() {
    const email = useRef();
    const password = useRef();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isFetching = useSelector(state => state.auth.isFetching);
    const error = useSelector(state => state.auth.error);

    const handleClick = (e) => {
        e.preventDefault();
        const userCredentials = {
            email: email.current.value,
            password: password.current.value,
        };
        dispatch(loginCall(userCredentials));
    };

    return (
        <div className="login">
            <div className="loginWrapper">
                <div className="loginLeft">
                    <h3 className="loginLogo">Zigsocial</h3>
                    <span className="loginDesc">
                        Connect with friends and the world around you on Zigsocial.
                    </span>
                </div>
                <div className="loginRight">
                    <form className="loginBox" onSubmit={handleClick}>
                        <input placeholder="Email" type="email" required className="loginInput" ref={email} />
                        <input placeholder="Password" required minLength="6" type="password" className="loginInput" ref={password} />
                        <button className="loginButton" type="submit" disabled={isFetching}>Log in</button>
                        {error && <div className="error">{error}</div>}
                        <span className="loginForgot">Forgot Password?</span>
                        <button className="loginRegisterButton" onClick={() => navigate('/register')} >
                            Create a New Account
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
