import React, { useRef } from "react";

const ChatFooter = ({ onSendMessage }) => {
  const inputRef = useRef();

  const SendMessageHandler = (e) => {
    e.preventDefault();
    const sendMessageForm = new FormData(e.target);
    if (sendMessageForm.get("content").trim() !== "") {
      onSendMessage(sendMessageForm);
    }
    inputRef.current.value = "";
  };

  return (
    <div className="chat-footer">
      <div className="container h-100">
        <div className="chat-footer-content h-100 d-flex align-items-center">
          <form onSubmit={SendMessageHandler}>
            {/* <!-- Message --> */}
            <input
              className="form-control"
              type="text"
              placeholder="Type here..."
              name="content"
              ref={inputRef}
            />

            {/* <!-- Emoji -->
            <button className="btn btn-emoji mx-2" type="button">
              <i className="bi bi-emoji-smile"></i>
            </button> */}

            {/* <!-- Add File -->
            <div className="dropup me-2">
              <button
                className="btn btn-add-file dropdown-toggle"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <i className="bi bi-plus-circle"></i>
              </button>
              <ul className="dropdown-menu">
                <li>
                  <a href="#">
                    <i className="bi bi-files"></i>Files
                  </a>
                </li>
                <li>
                  <a href="#">
                    <i className="bi bi-mic"></i>Audio
                  </a>
                </li>
                <li>
                  <a href="#">
                    <i className="bi bi-file-earmark"></i>Document
                  </a>
                </li>
                <li>
                  <a href="#">
                    <i className="bi bi-file-bar-graph"></i>Pull
                  </a>
                </li>
                <li>
                  <a href="#">
                    <i className="bi bi-geo-alt"></i>Location
                  </a>
                </li>
              </ul>
            </div> */}

            {/* <!-- Send --> */}
            <button className="btn btn-submit" type="submit">
              <i className="bi bi-cursor"></i>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChatFooter;
