import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useLoaderData } from "react-router-dom";
import ChatLayout from "../../layouts/ChatLayout";
import MyMessage from "../../components/ui/MessageBox/MessageCluster";
import useRearrangeMessages from "../../hooks/useRearrangeMessages";
import MessageCluster from "../../components/ui/MessageBox/MessageCluster";
import { useSelector } from "react-redux";

export const chatLoader = async ({ params }) => {
  const response = await axios.get(`api/messages/${params.id}`);
  return response.data;
};

const Chat = () => {
  const chatData = useLoaderData();
  const [messages, addMessage] = useRearrangeMessages(chatData.messages);
  const authUser = useSelector((store) => store.auth.user);
  const scrollDummyBoxRef = useRef();
  const sendMessageHandler = async (message) => {
    const response = await axios.postForm(
      `api/messages/${chatData.conversation.id}`,
      message
    );
    addMessage(response.data);
  };

  useEffect(() => {
    window.Echo.private(`conversation.${chatData.conversation.id}`).listen(
      "NewMessageEvent",
      (e) => {
        if (e.message.sender_id !== authUser.id) {
          addMessage(e.message);
        }
      }
    );
  }, []);

  useEffect(() => {
    scrollDummyBoxRef.current.scrollIntoView();
  }, [messages]);

  const getSenderImage = (sender_id) => {
    if (sender_id !== authUser.id) {
      // the sender of image is some other person
      if (chatData.conversation.member) {
        return chatData.conversation.member.details.image;
      } else {
        const { details } = chatData.conversation.members.find(
          (member) => member.id === sender_id
        );
        return details.image;
      }
    }
    return authUser.details?.image;
  };

  return (
    <ChatLayout
      conversation={chatData.conversation}
      onSendMessage={sendMessageHandler}
    >
      {messages.map((cluster) => {
        return (
          <MessageCluster
            key={cluster.cluster_id}
            messages={cluster.messages}
            sender={cluster.sender}
            senderImage={getSenderImage(cluster.sender)}
          />
        );
      })}
      <div ref={scrollDummyBoxRef}></div>
    </ChatLayout>
  );
};

export default Chat;
