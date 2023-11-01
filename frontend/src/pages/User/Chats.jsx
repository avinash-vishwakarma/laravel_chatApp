import axios from "axios";
import React, { useRef, useState } from "react";
import { Link, useLoaderData } from "react-router-dom";
import ChatUser from "../../components/ui/Chat/ChatUser";
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
  // const [allConversations, setAllConversations] = useState(conversations);

  // console.log(conversations);

  return (
    <div className="container">
      <div className="add-new-contact-wrap">
        <Link
          className="shadow"
          to="/find-users"
          data-bs-toggle="modal"
          data-bs-target="#addnewcontact"
        >
          <i className="bi bi-plus-lg"></i>
        </Link>
      </div>
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
