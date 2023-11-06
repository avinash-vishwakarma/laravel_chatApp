import axios from "axios";
import React, { useRef, useState } from "react";
import { Link, useLoaderData } from "react-router-dom";
import ChatUser from "../../components/ui/Chat/ChatUser";
import Modal from "../../components/ui/Modal";
// import { Swiper, SwiperSlide } from "swiper/react";

export const chatsLoader = async () => {
  try {
    const { data } = await axios.get("/api/chats");
    return data;
  } catch (err) {
    console.log(err);
    return err;
  }
};

const Chats = () => {
  const conversations = useLoaderData();
  const [showAddModal, setShowAddModal] = useState(false);
  const addButtonClickHandler = () => {
    setShowAddModal(true);
  };

  return (
    <div className="container">
      <div className="add-new-contact-wrap">
        <a onClick={addButtonClickHandler} className="shadow">
          <i className="bi bi-plus-lg"></i>
        </a>
      </div>
      <Modal
        show={showAddModal}
        onCloseHandler={setShowAddModal.bind(null, false)}
      >
        <Modal.Header onCloseHandler={setShowAddModal.bind(null, false)}>
          Chat Options
        </Modal.Header>
        <Modal.Body>
          <Link to="/create-new-group" className="btn btn-primary w-100 mb-2">
            <i className="bi bi-people-fill mx-2"></i>
            Create New Group
          </Link>
          <Link to="/find-users" className="btn btn-primary w-100">
            <i className="bi bi-person-add mx-2"></i>
            Find Users
          </Link>
        </Modal.Body>
      </Modal>
      {/* <!-- Chat User List --> */}
      <ul className="ps-0 chat-user-list">
        {conversations.map((chat) => (
          <ChatUser key={chat.id} chat={chat} />
        ))}
      </ul>
    </div>
  );
};

export default Chats;
