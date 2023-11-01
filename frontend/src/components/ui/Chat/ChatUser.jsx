import React, { useEffect } from "react";
import { Link } from "react-router-dom";

const ChatUser = ({ chat }) => {
  const chatData = {};
  if (chat.type == "single") {
    const sender = chat.other_member[0];
    chatData.name = sender.name;
    chatData.profileImage = sender.image || "place-holder-image.jpg";
  } else {
    // chat Data for group
  }

  useEffect(() => {
    console.log(chat);
  }, [chat]);

  return (
    <li className="p-3 chat-unread">
      <Link className="d-flex" to={`/chat/${chat.id}`}>
        {/* <!-- Thumbnail --> */}
        <div className="chat-user-thumbnail me-3 shadow">
          {/* profile image */}
          <img
            className="img-circle"
            src={`${
              import.meta.env.VITE_REACT_APP_API_BASE_URL
            }/images/user-profile-images/${chatData.profileImage}`}
            alt=""
          />
          <span className="active-status"></span>
        </div>
        {/* <!-- Info --> */}
        <div className="chat-user-info">
          {/* user name */}
          <h6 className="text-truncate mb-0">{chatData.name}</h6>
          <div className="last-chat">
            <p className="mb-0 text-truncate">
              {/* last chat */}
              {chat.latestMessage}
              {/* <span className="badge rounded-pill bg-primary">2</span> */}
            </p>
          </div>
        </div>
      </Link>

      {/* <!-- Options --> */}
      <div className="dropstart chat-options-btn">
        <button
          className="btn dropdown-toggle"
          type="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <i className="bi bi-three-dots-vertical"></i>
        </button>
        <ul className="dropdown-menu">
          <li>
            <a href="#">
              <i className="bi bi-mic-mute"></i>Mute
            </a>
          </li>
          <li>
            <a href="#">
              <i className="bi bi-slash-circle"></i>Ban
            </a>
          </li>
          <li>
            <a href="#">
              <i className="bi bi-trash"></i>Remove
            </a>
          </li>
        </ul>
      </div>
    </li>
  );
};

export default ChatUser;
