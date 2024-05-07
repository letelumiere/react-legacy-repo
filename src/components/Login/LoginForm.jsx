import React from "react";
import "./LoginFormStyle.css";

const LoginForm = ({ onSubmit, email, onEmailChange, password, onPasswordChange }) => {
    
    const handleSubmit = (event) => {   
        event.preventDefault();
        // 여기서 로그인 로직을 추가하면 됩니다.
        onSubmit();
    };

    return (
        <div className="login-body">
            <form onSubmit={handleSubmit}>
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

                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default LoginForm;
