// MainPage.jsx 수정
import React, { useState } from "react";
import RegisterForm from "../../components/Register/RegisterForm.jsx";
import LoginForm from "../../components/Login/LoginForm.jsx";
import socket from "../../server.js";

import { useNavigate } from "react-router-dom";

const MainPage = () => {
    const [showRegisterForm, setShowRegisterForm] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const sid = socket.id;

    const toggleForm = () => {
        setShowRegisterForm(!showRegisterForm);
        
    };

    const navigate = useNavigate();

    const handleLoginFormSubmit = async (event) => {
        event.preventDefault();
        console.log("onsubmit begins!");
        
        try {
            const response = await fetch('http://localhost:5001/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password, sid})
            });
    
            // HTTP 응답 코드 확인
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
    
            // Content-Type 헤더를 확인하여 JSON 형식인지 확인
            const contentType = response.headers.get('Content-Type');
            if (!contentType || !contentType.includes('application/json')) {
                throw new Error('Invalid content type');
            }
    
            // JSON 형식으로 파싱
            const data = await response.json();
            console.log(data); // 올바른 JSON 형식의 데이터

            //http응답 후 socket 로직 실행
            socket.emit("login", {email, password, sid}, (res) => {
                if(res?.ok){
                    console.log(email, password, sid);
                }

                navigate("/roomlist");
            });


            // 이후에 데이터 처리 로직을 추가
        } catch (error) {
            console.error('Error: '+ error.message);
            // 에러 처리 로직 추가
        }
    };    
    
    const handleRegisterFormSubmit = async (event) => {
        event.preventDefault();
        console.log("onsubmit begin!");
        
        try {
            const response = await fetch('http://localhost:5001/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password, sid })
            });
    
            // HTTP 응답 코드 확인
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
    
            // Content-Type 헤더를 확인하여 JSON 형식인지 확인
            const contentType = response.headers.get('Content-Type');
            if (!contentType || !contentType.includes('application/json')) {
                throw new Error('Invalid content type');
            }
    
            // JSON 형식으로 파싱
            const data = await response.json();
            console.log(data); // 올바른 JSON 형식의 데이터
            
            // 이후에 데이터 처리 로직을 추가
        } catch (error) {
            console.error('Error: '+ error.message);
            // 에러 처리 로직 추가
        }
    };
    
    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    // Form에서 호출할 새로운 핸들러 함수
    const handleRegisterFormChange = (newEmail, newPassword) => {
        setEmail(newEmail);
        setPassword(newPassword);
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
                        onChange={handleRegisterFormChange}
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
