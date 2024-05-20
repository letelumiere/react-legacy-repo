import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import socket from "../../server";
import { Button } from "@mui/base/Button";

import InputField from "../../components/InputField/InputField";
import MessageContainer from "../../components/MessageContainer/MessageContainer";

//import { sendMessage, leaveRoom } from './ChatPageFunctions'; // 수정된 파일을 import <= socket.*은 function이 아니므로 수정 필

const ChatPage = ({ user }) => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [messageList, setMessageList] = useState([]);
    const [message, setMessage] = useState("");

    useEffect(() => {
        // 메시지 수신
        socket.on("message", (res) => {
            setMessageList((prevState) => prevState.concat(res));
        });

        // 컴포넌트 언마운트 시 이벤트 핸들러 정리
        return () => {
            socket.off("message");
        };


    }, [id]); // id 값이 변경될 때마다 실행

    const sendMessage = (event) => {
      event.preventDefault();
      socket.emit("sendMessage", message, (res) => {
        if (!res.ok) {
          console.log("error message", res.error);
        }
        setMessage("");
      });
    };

    const leaveRoom = () => {
      socket.emit("leaveRoom", user, (res) => {
        console.log(res.data);
        if(res.ok) {
          navigate("/roomlist");  //다시 채팅방 리스트로.
        }else{
          console.log("wtf");
        }
      });
    };

    return (
        <div className="App">
            <nav>
                <Button onClick={(leaveRoom)} className='back-button'> ← </Button>                 
                <div className='nav-user'>{user && user.name}</div>
            </nav>

            {messageList.length > 0 && <MessageContainer messageList={messageList} user={user} />}
            <InputField
                message={message}
                setMessage={setMessage}
                sendMessage={sendMessage}/>
        </div>
    );
}

export default ChatPage;

