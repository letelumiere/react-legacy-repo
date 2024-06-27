// RegisterForm.jsx 수정
import React, { useState } from "react";
import "./RegisterFormStyle.css";

const RegisterForm = ({ onSubmit, email, onEmailChange, password, onPasswordChange }) => {
    const [emailRemembered, setEmailRemembered] = useState(false);
    const [inputPassword, setInputPassword] = useState(false);
    const [inputPasswordRetype, setInputPasswordRetype] = useState(false);

    const handleEmailRememberChange = (event) => {
        const checked = event.target.checked;
        setEmailRemembered(checked);
        localStorage.setItem("email", JSON.stringify(checked));
    };

    const passwordVisibility = (event) => {
        event.preventDefault(); // 새로고침, 혹은 리다이렉트 방지
        setInputPassword(!inputPassword);
        setInputPasswordRetype(!inputPasswordRetype);
    };

    return (
        <div className="register-body">
            <form>
                <input
                    className="register-email"
                    placeholder="Type in here…"
                    value={email}
                    onChange={onEmailChange}
                />
                <input
                    className="register-email-remember"
                    type="checkbox"
                    checked={emailRemembered}
                    onChange={handleEmailRememberChange}
                />
                <input
                    className="register-password"
                    type={inputPassword ? "text" : "password"}
                    placeholder="type in here..."
                    value={password}
                    onChange={onPasswordChange}
                />
                <input
                    className="register-password-retype"
                    type={inputPasswordRetype ? "text" : "password"}
                    placeholder="type in here..."
                />

                <button onClick={passwordVisibility}>
                    {inputPassword ? "Hide Password" : "Show Password"}
                </button>

                {/* 추가된 버튼 */}
                <button onClick={onSubmit}>Register</button>
            </form>
        </div>
    );
};

export default RegisterForm;
