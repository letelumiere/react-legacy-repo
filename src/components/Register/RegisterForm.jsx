import React, { useEffect, useState } from "react";
import "./RegisterFormStyle.css";

const RegisterForm = () => {
    const [emailRemembered, setEmailRemembered] = useState(false);
    const [emailInput, setEmailInput] = useState('');
    const [inputPassword, setInputPassword] = useState(false);
    const [inputPasswordRetype, setInputPasswordRetype] = useState(false);

    useEffect(() => {
        const storedEmail = localStorage.getItem("email");
        if (storedEmail !== null) {
            setEmailRemembered(JSON.parse(storedEmail));
        }
    }, []);

    const handleEmailRememberChange = (event) => {
        const checked = event.target.checked;
        setEmailRemembered(checked);
        localStorage.setItem("email", JSON.stringify(checked));
    }

    const passwordVisibility = (event) => {
        event.preventDefault(); // 새로고침, 혹은 리다이렉트 방지
        setInputPassword(!inputPassword);
        setInputPasswordRetype(!inputPasswordRetype);
    }

    return (
        <div className="register-body">
            <form>
                <input
                    className="register-email"
                    placeholder="Type in here…"
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
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
                />
                <input
                    className="register-password-retype"
                    type={inputPasswordRetype ? "text" : "password"}
                    placeholder="type in here..."
                />

                <button onClick={passwordVisibility}>
                    {inputPassword ? "Hide Password" : "Show Password"}
                </button>
            </form>
        </div>
    );
};

export default RegisterForm;