import "./register.css";
import { useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { handleClick } from '../../services/Service'

export default function Register() {
    const email = useRef();
    const username = useRef();
    const password = useRef();
    const passwordAgain = useRef();
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        await handleClick(e, passwordAgain, password, username, email, navigate);
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
                    <form className="loginBox" onSubmit={handleSubmit}>
                        <input placeholder="Username" required ref={username} className="loginInput" />
                        <input placeholder="Email" required ref={email} className="loginInput" type="email" />
                        <input placeholder="Password" required ref={password} className="loginInput" type="password" minLength="6" />
                        <input placeholder="Password Again" required ref={passwordAgain} className="loginInput" type="password" />
                        <button className="loginButton" type="submit">Sign Up</button>
                        <button className="loginRegisterButton" onClick={() => {
                            navigate("/login")
                        }}>
                            Log into Account
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}