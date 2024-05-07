import React, { useState } from "react";
import RegisterForm from "../../components/Register/RegisterForm.jsx";
import LoginForm from "../../components/Login/LoginForm.jsx";

const MainPage = () => {
    const [showRegisterForm, setShowRegisterForm] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const toggleForm = () => {
        setShowRegisterForm(!showRegisterForm);
    };

    const handleLoginFormSubmit = (event) => {
        event.preventDefault();
        // 여기서 로그인 로직을 추가하면 됩니다.
        console.log("Login submitted:", email, password);
    };

    const handleRegisterFormSubmit = (event) => {
        event.preventDefault();
        // 여기서 회원가입 로직을 추가하면 됩니다.
        console.log("Register submitted:", email, password);
    };

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    return (
        <div>
            <button onClick={toggleForm}>
                {showRegisterForm ? "Switch to Login Form" : "Switch to Register Form"}
            </button>
            <div>
                {showRegisterForm ? (
                    <RegisterForm
                        onSubmit={handleRegisterFormSubmit}
                        email={email}
                        onEmailChange={handleEmailChange}
                        password={password}
                        onPasswordChange={handlePasswordChange}
                    />
                ) : (
                    <LoginForm
                        onSubmit={handleLoginFormSubmit}
                        email={email}
                        onEmailChange={handleEmailChange}
                        password={password}
                        onPasswordChange={handlePasswordChange}
                    />
                )}
            </div>
        </div>
    );
};

export default MainPage;
