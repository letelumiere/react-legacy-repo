import React, { useState } from "react";
import RegisterForm from "../../components/Register/RegisterForm";
import SignupForm from "../../components/Signup/SignupForm";

const MainPage = () => {
    const [showRegisterForm, setShowRegisterForm] = useState(false);

    const toggleForm = () => {
        setShowRegisterForm(!showRegisterForm);
    };

    return (
        <div>
            <button onClick={toggleForm}>
                {showRegisterForm ? "Switch to Login Form" : "Switch to Signup Form"}
            </button>
            <div>
                {showRegisterForm ? <SignupForm /> : <RegisterForm />}
            </div>
        </div>
    );
};

export default MainPage;

/*

import React, { useState } from "react";
import RegisterForm from "../../components/Register/RegisterForm";
import SignupForm from "../../components/Signup/SignupForm";

const MainPage = () => {
    const [showRegisterForm, setShowRegisterForm] = useState(false);

    const toggleForm = () => {
        setShowRegisterForm(!showRegisterForm);
    };

    return (
        <div>
            <button onClick={toggleForm}>
                {showRegisterForm ? "Switch to Login Form" : "Switch to Signup Form"}
            </button>
            <div>
                {showRegisterForm ? <SignupForm /> : <RegisterForm />}
            </div>
        </div>
    );
};

export default MainPage;
*/