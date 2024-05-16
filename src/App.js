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
        <Route exact path="/roomlist/" element={<RoomListPage rooms={rooms} />} />
        <Route exact path="/room/:id" element={<ChatPage user={user} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
