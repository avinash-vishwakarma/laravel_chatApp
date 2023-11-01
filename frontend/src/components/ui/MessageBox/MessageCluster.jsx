import React from "react";
import { useSelector } from "react-redux";
import Message from "./Message";

const MessageCluster = ({ messages, sender, senderImage }) => {
  const authUser = useSelector((store) => store.auth.user);

  return (
    <div className={`single-chat-item ${authUser.id === sender && "outgoing"}`}>
      {/* <!-- User Avatar --> */}
      <div className="user-avatar mt-1">
        {/* <!-- If the user avatar isn't available, will visible the first letter of the username. --> */}
        <span className="name-first-letter">A</span>
        <img
          src={`${
            import.meta.env.VITE_REACT_APP_API_BASE_URL
          }/images/user-profile-images/${
            senderImage || "place-holder-image.jpg"
          }`}
          alt=""
        />
      </div>
      {/* <!-- User Message --> */}
      <div className="user-message">
        {messages.map((message) => {
          return <Message key={message.id} content={message.content} />;
        })}

        {/* <!-- Time and Status --> */}
        {/* <div className="message-time-status">
          <div className="sent-time">11:46 AM</div>
          <div className="sent-status delivered">
            <i className="bi bi-check"></i>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default MessageCluster;
