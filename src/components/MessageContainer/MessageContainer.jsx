import React from "react";
import { Container } from "@mui/system";
import "./MessageContainer.css";

const MessageContainer = ({ messageList, user }) => {
  return (
    <div>
      {messageList.map((message, index) => {
        // 디버깅용 로그
        console.log('message:', message);
        console.log('message.user:', message.user);

        const messageUser = message.user || { name: '' };

        return (
          <Container key={`${message._id}-${index}`} className="message-container">
            {messageUser.name === "system" ? (
              <div className="system-message-container">
                <p className="system-message">{message.chat}</p>
              </div>
            ) : messageUser.name === user.name ? (
              <div className="my-message-container">
                <div className="my-message">{message.chat}</div>
              </div>
            ) : (
              <div className="your-message-container">
                <img
                  src="/profile.jpeg"
                  className="profile-image"
                  style={
                    index === 0 ||
                    messageList[index - 1]?.user?.name === user.name ||
                    messageList[index - 1]?.user?.name === "system"
                      ? { visibility: "visible" }
                      : { visibility: "hidden" }
                  }
                />
                <div className="your-message">{message.chat}</div>
              </div>
            )}
          </Container>
        );
      })}
    </div>
  );
};

export default MessageContainer;
