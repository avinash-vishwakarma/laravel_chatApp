import React from "react";
import { Link } from "react-router-dom";

const ChatHeader = ({ conversation }) => {
  let senderImage;
  if (conversation.type === "single") {
    senderImage = conversation.member.details.image || "place-holder-image.jpg";
  } else {
    // group image
  }

  return (
    <div className="header-area" id="headerArea">
      <div className="container">
        {/* <!-- Header Content --> */}
        <div className="header-content position-relative d-flex align-items-center justify-content-between">
          {/* <!-- Chat User Info --> */}
          <div className="chat-user--info d-flex align-items-center">
            {/* <!-- Back Button --> */}
            <div className="back-button">
              <Link to="/chats">
                <i className="bi bi-arrow-left-short"></i>
              </Link>
            </div>

            {/* <!-- User Thumbnail & Name --> */}
            <div className="user-thumbnail-name">
              <img
                src={`${
                  import.meta.env.VITE_REACT_APP_API_BASE_URL
                }/images/user-profile-images/${senderImage}`}
                alt=""
              />
              <div className="info ms-1">
                <p>{conversation.member.name}</p>
                <span className="active-status">Active Now</span>
                {/* <!-- span.offline-status.text-muted Last actived 27m ago --> */}
              </div>
            </div>
          </div>

          {/* <!-- Call & Video Wrapper --> */}
          <div className="call-video-wrapper d-flex align-items-center">
            {/* <!-- Video Icon --> */}
            {/* <div className="video-icon me-3">
              <a className="text-secondary" id="videoCallingButton" href="#">
                <i className="bi bi-camera-video"></i>
              </a>
            </div> */}

            {/* <!-- Call Icon --> */}
            {/* <div className="call-icon me-3">
              <a className="text-secondary" id="callingButton" href="#">
                <i className="bi bi-telephone"></i>
              </a>
            </div> */}

            {/* <!-- Info Icon --> */}
            <div className="info-icon">
              <a className="text-secondary" href="#">
                <i className="bi bi-info-circle"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;
