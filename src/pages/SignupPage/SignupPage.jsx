import React, { useEffect, useState } from "react";
import socket from "../../server";
import { useNavigate } from "react-router-dom";
import "./SignupPageStyle.css";
import { Checkbox } from "@mui/joy";


const SignupPage = () => {
    const [emailRemembered, setEmailRemembered] = useState(false);
    const [emailInput, setEmailInput] = useState('');
    const [inputPassword, setInputPassword] = useState(false);

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
    }

    return (
        <div className="signup-body">
            <form>
                <input
                    className="signup-email"
                    placeholder="Type in here…"
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                />
                <input
                    className="signup-email-remember"
                    type="checkbox"
                    checked={emailRemembered}
                    onChange={handleEmailRememberChange}
                />
                <input
                    className="signup-password"
                    type={inputPassword ? "text" : "password"}
                    placeholder="type in here..."
                />
                <button onClick={passwordVisibility}>
                    {inputPassword ? "Hide Password" : "Show Password"}
                </button>
            </form>
        </div>
    );
};

export default SignupPage;