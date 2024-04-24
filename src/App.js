import { useEffect,useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import socket from "./server";
import ChatPage from "./pages/chatPage/ChatPage.jsx";

import "./App.css";

function App() {  


return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<ChatPage />} />

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
