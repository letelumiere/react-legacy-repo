export function askUserName(socket, setUser) {
    const userName = prompt("당신의 이름을 입력하세요.");
    console.log("userName = ", userName);

    socket.emit("login", userName, (res) => {
        if (res?.ok) {
            setUser(res.data);
        }
    });
}
// client.js

export function createInstance(socket, userA, userB) {
    const instanceName = "testInstance";

    socket.emit("createInstance", { userA, userB, instanceName }, (res) => {
        if (res?.ok) {
            console.log("Instance created successfully:", res.instance);
            // 클라이언트에서 필요한 작업 수행
        } else {
            console.error("Failed to create instance:", res.error);
            // 에러 처리 로직 추가
        }
    });
}


export function joinInstance(socket, instanceId) {
    socket.emit("joinInstance", instanceId, (res) => {
        if (res && res.ok) {
            console.log("Successfully joined the instance", res);
        } else {
            console.log("Failed to join the instance", res);
        }
    });
};

export function leaveInstance(socket, user, navigate) {

};


export function joinRoom(socket, roomId) {
    socket.emit("joinRoom", roomId, (res) => {
        if (res && res.ok) {
            console.log("Successfully joined the room", res);
        } else {
            console.log("Failed to join the room", res);
        }
    });
};

export function sendMessage(event, socket, message, setMessage) {
    event.preventDefault();
    
    socket.emit("sendMessage", message, (res) => {
      if (!res.ok) {
        console.log("error message", res.error);
      }
      setMessage("");
    });
  }
  

export function leaveRoom(socket, user, navigate) {
    socket.emit("leaveRoom", user, (res) => {
        if (res.ok) {
            navigate("/");  
        } else {
            console.log("wtf");
        }
    });
}

