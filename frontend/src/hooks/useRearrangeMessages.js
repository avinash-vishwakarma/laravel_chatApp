import { useCallback, useEffect, useState } from "react";

const useRearrangeMessages = (setUpMessages) => {
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    const myMessages = [];
    setUpMessages.forEach((element) => {
      // take a message and make a cluster
      // check if the last index message is same as now
      const lastMessage = myMessages[myMessages.length - 1] || null;
      if (lastMessage?.sender === element.sender_id) {
        // add the message to same cluster
        lastMessage.messages.push(element);
      } else {
        // create a new cluster with
        myMessages.push({
          cluster_id: myMessages.length,
          sender: element.sender_id,
          messages: [element],
        });
      }
    });
    setMessages(myMessages);
  }, []);

  const addMessage = useCallback((newMessage) => {
    // take the state message
    setMessages((latestMessage) => {
      const latestMessageCopy = [...latestMessage];
      const lastMessage = latestMessageCopy[latestMessageCopy.length - 1];
      if (lastMessage?.sender === newMessage.sender_id) {
        // same cluster
        // console.log(lastMessage);
        lastMessage.messages.push(newMessage);
      } else {
        // create new cluster
        latestMessageCopy.push({
          cluster_id: latestMessageCopy.length,
          sender: newMessage.sender_id,
          messages: [newMessage],
        });
      }
      return latestMessageCopy;
    });
  }, []);

  return [messages, addMessage];
};

export default useRearrangeMessages;
