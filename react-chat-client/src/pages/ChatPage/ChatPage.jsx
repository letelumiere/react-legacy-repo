import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import socket from "../../server";
import { Button } from "@mui/base/Button";

import InputField from "../../components/InputField/InputField";
import MessageContainer from "../../components/MessageContainer/MessageContainer";


const ChatPage = ({ user }) => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [messageList, setMessageList] = useState([]);
    const [message, setMessage] = useState("");

    useEffect(() => {
      socket.on("message", (res) => {
        setMessageList((prevState) => prevState.concat(res));
      });

      socket.emit("joinRoom", id, (res)=>{
        if(!res?.ok){
          console.log("fail to join", res);
        }
      });

      return () => {
        socket.off("message");
      };
    }, [id]);

    const sendMessage = (event) => {
      event.preventDefault();
      
      if(!message.trim()){
        return;
      } 

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
          console.log("can not leaveRoom with client. ");
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
