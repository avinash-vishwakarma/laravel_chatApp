import React from "react";
import ChatHeader from "../components/ui/Headers/ChatHeader";
import ChatFooter from "../components/ui/Footers/ChatFooter";

const ChatLayout = ({ children, onSendMessage, conversation }) => {
  return (
    <>
      <ChatHeader conversation={conversation} />

      <div id="chat-wrapper" className="page-content-wrapper py-3">
        <div className="container">
          <div className="chat-content-wrap">{children}</div>
        </div>
      </div>

      <ChatFooter onSendMessage={onSendMessage} />
    </>
  );
};

export default ChatLayout;
