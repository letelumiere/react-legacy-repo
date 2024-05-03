import { useEffect,useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import socket from "./server";
import RoomListPage from "./pages/RoomListPage/RoomListPage.jsx";
import ChatPage from "./pages/ChatPage/ChatPage.jsx";
import MainPage from "./pages/MainPage/MainPage.jsx";

import "./App.css";


function App() {
  const [user, setUser] = useState(null);
  const [rooms, setRooms] = useState([]);

  console.log(rooms);

  useEffect(() => {
    socket.on("rooms", (res) => {
      setRooms(res);
    });
    //askUserName();
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

return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<MainPage />} />
        <Route exact path="/roomList/:id" element={<RoomListPage rooms={rooms} />} />
        <Route exact path="/room/:id" element={<ChatPage user={user} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

//    socket.on("message", (message) => {
//  setMessageList((prevState) => prevState.concat(message));
//});

//import InputField from "./components/InputField/InputField.jsx";
//import MessageContainer from "./components/MessageContainer/MessageContainer.js";
//  const [message, setMessage] = useState("");
//  const [messageList, setMessageList] = useState([]);


  /*
  return (
    <div>
      <div className="App">
        <MessageContainer messageList={messageList} user={user} />
        <InputField 
          message={message} 
          setMessage={setMessage} 
          sendMessage={sendMessage} />
      </div>
    </div>
  );
  */

  /*
  let sendMessage = (event) => {
    event.preventDefault();
    socket.emit("sendMessage", message, (res)=> {
      console.log("sendMessage res = ", res);
    });
  };
*/
