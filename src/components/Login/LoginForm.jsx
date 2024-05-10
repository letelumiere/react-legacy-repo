import React from "react";
import "./LoginFormStyle.css";

const LoginForm = ({ onSubmit, email, onEmailChange, password, onPasswordChange }) => {
    
    return (
        <div className="login-body">
            <form>
                <input
                    className="login-email"
                    placeholder="Type in here…"
                    value={email}
                    onChange={onEmailChange}
                />
                <input
                    className="login-password"
                    type="password"
                    placeholder="type in here..."
                    value={password}
                    onChange={onPasswordChange}
                />

            <button onClick={onSubmit}>login</button>
            </form>
        </div>
    );
};

export default LoginForm;
