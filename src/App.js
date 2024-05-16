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
