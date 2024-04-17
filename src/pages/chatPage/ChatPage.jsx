import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from "react-router-dom";
import socket from "../../server";
import { Button } from "@mui/base/Button";

import InputField from "../../components/InputField/InputField";
import MessageContainer from "../../components/MessageContainer/MessageContainer";
import "./ChatPageStyle.css";

const ChatPage = ({ user }) => {
    const navigate = useNavigate();
    const {id} = useParams();
    const [messageList, setMessageList] = useState([]);
    const [message, setMessage] = useState("");
    
    console.log(id);

    useEffect(() => {
      socket.on("message", (res) => {
        console.log("message",res)
        setMessageList((prevState) => prevState.concat(res));
      });

      socket.emit("joinRoom", id, (res)=>{
        if(res && res.ok){
          console.log("successfully join", res);
        }else{
          console.log("fail to join", res);
        }
      });
    }, [id]);
  
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
        console.log("buttons!!");

        console.log(res);
        console.log(res.data);


        if(res.ok) {
          navigate("/");  //다시 채팅방 리스트로.
        }else{
          console.log("wtf");
        }
      });
    };

    return (
      <div>
        <div className="App">
          <div>
            <nav>
              <Button onClick={leaveRoom} className='back-button'>←</Button>
              <div className='nav-user'>{user.name}</div>
            </nav>
            {messageList.length > 0 ? (
              <MessageContainer messageList={messageList} user={user} />
            ) : null}
          </div>
          <InputField
            message={message}
            setMessage={setMessage}
            sendMessage={sendMessage}
          />
        </div>
      </div>
    );

}

export default ChatPage;


