import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import socket from "../../server";
import { Button } from "@mui/base/Button";

import InputField from "../../components/InputField/InputField";
import MessageContainer from "../../components/MessageContainer/MessageContainer";

import { sendMessage, leaveRoom } from './ChatPageFunctions'; // 수정된 파일을 import

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

    return (
        <div className="App">
            <nav>
                <Button onClick={() => leaveRoom(socket, user, navigate)} className='back-button'> ← </Button>                 
                <div className='nav-user'>{user && user.name}</div>
            </nav>

            {messageList.length > 0 && <MessageContainer messageList={messageList} user={user} />}
            <InputField
                message={message}
                setMessage={setMessage}
                sendMessage={(event) => sendMessage(event, socket, message, setMessage)}/>
        </div>
    );
}

export default ChatPage;




/*

const MainPage = ({ user }) => {
  const navigate = useNavigate();
  const {id} = useParams();
  const [messageList, setMessageList] = useState([]);
  const [message, setMessage] = useState("");
  
  const [, setInstance] = useState([]);

  console.log(rooms);

  useEffect(() => {
    socket.on("rooms", (res) => {
      setRooms(res);
    });
    askUserName();
  }, []);

  const askUserName = () => {
    const userName = prompt("당신의 이름을 입력하세요.");
    console.log("userName = ", userName);

    socket.emit("login", userName, (res) => {
      if(res?.ok){
        setUser(res.data);
      }
    });
  };


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
export default MainPage;


*/