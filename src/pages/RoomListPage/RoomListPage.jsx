import React, { useEffect, useState } from "react";
import socket from "../../server";
import { useNavigate } from "react-router-dom";
import "./RoomListPageStyle.css";

const RoomListPage = ({rooms}) => {
  const navigate = useNavigate();
  const [isNavigating, setIsNavigating] = useState(false);


  useEffect(() => {
    console.log('socket connected', socket.connected);
  },[]);

  const moveToChat = (roomId) => {
    if (!isNavigating) {
      setIsNavigating(true);
      navigate(`/room/${roomId}`);
    }
  };
  return (
    <div className="room-body">
      <div className="room-nav">채팅 ▼</div>

      {rooms.length > 0
        ? rooms.map((room) => (
            <div
              className="room-list"
              key={room._id}
              onClick={() => moveToChat(room._id)}
            >
              <div className="room-title">
                <img src="/profile.jpeg" />
                <p>{room.room}</p>
              </div>
              <div className="member-number">{room.members.length}</div>
            </div>
          ))
        : null}
    </div>
  );
};

export default RoomListPage;