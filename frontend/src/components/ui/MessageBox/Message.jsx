import React from "react";

const Message = ({ content }) => {
  return (
    <div className="message-content">
      <div className="single-message">
        <p>{content}</p>
      </div>

      {/* <!-- Options --> */}
      <div className="dropstart">
        <button
          className="btn btn-options dropdown-toggle"
          type="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <i className="bi bi-three-dots-vertical"></i>
        </button>
        <ul className="dropdown-menu">
          <li>
            <a href="#">
              <i className="bi bi-reply"></i>Reply
            </a>
          </li>
          <li>
            <a href="#">
              <i className="bi bi-forward"></i>Forward
            </a>
          </li>
          <li>
            <a href="#">
              <i className="bi bi-trash"></i>Remove
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Message;
