import React from "react";

const SingleUserCard = ({ name, email, onChatSelect, id }) => {
  return (
    <li className="p-3 mb-2" onClick={onChatSelect.bind(null, id)}>
      <span className="d-flex">
        {/* <!-- Thumbnail --> */}
        <div className="chat-user-thumbnail me-3 shadow">
          <img className="img-circle" src="img/bg-img/user4.png" alt="" />
          {/* <span className="active-status"></span> */}
        </div>
        {/* <!-- Info --> */}
        <div className="chat-user-info">
          <h6 className="text-truncate mb-0">{name}</h6>
          <div className="last-chat">
            <p className="text-truncate mb-0">Email : {email}</p>
          </div>
        </div>
      </span>
    </li>
  );
};

export default SingleUserCard;
