import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import Message from "./Message";
import { AuthContext } from "./AuthContext";
import '../styles/inbox.css';
const API_BASE = import.meta.env.VITE_API_BASE_URL;

const ChatBox = ({ chatId }) => {
  //get chat given chatId
  const [chatData, setChatData] = useState(null);
  const [message, setMessage] = useState(null);
  const userID = "tgbhyx06nvXxk1UtPmHx";
  const [time, setTime] = useState(null);

  let messages = [];

  const fetchChat = async () => {
    const chatResponse = await axios.get(
      `${API_BASE}/chat/${chatId}`
    );

    const chatResponseData = chatResponse.data;

    for (var messageId of chatResponseData.messages) {
      var message = "",
        timestamp = "",
        username = "",
        profilepic = "";

      const messageResponse = await axios.get(
        `${API_BASE}/messages/${messageId}`
      );

      const messageResponseData = messageResponse.data;

      message = messageResponseData.message;

      timestamp = messageResponseData.date;

      const userResponse = await axios.get(
        `${API_BASE}/users/${messageResponseData.senderId}`
      );

      const userResponseData = userResponse.data;
      username = userResponseData.username;
      profilepic = userResponseData.profilepic;

      let messageToPush = {
        message: message,
        timestamp: timestamp,
        username: username,
        profilepic: profilepic,
      };

      messages.push(messageToPush);
    }
    

    setChatData(messages);
  };

  useEffect(() => {
    fetchChat();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    var curChatId = "chat/hTec14wd5pSZxNQwanR7"
    const body = {
      chatId: curChatId,
      date: time,
      message: message,
      senderId: userID,
    };

    await axios.post(
      `${API_BASE}/messages/hTec14wd5pSZxNQwanR7`,
      body
    );

    fetchChat();

    setMessage("");
  };

  
  const handleChange = (e) => {
    setMessage(e.target.value);
    updateCurrentTime();
};

const updateCurrentTime = () => {
    setTime(new Date().toLocaleString());
};

  return (
    <>
      {/* <h1>You have entered chat {chatId} </h1> */}
      <div className="messages-box">
        {chatData &&
          chatData.map((chatMessage, index) => (
            <Message key={index} message={chatMessage} />
          ))}
      </div>

      <form className="input-message" onSubmit={handleSubmit}>
        <div className="formfield-new">
          <label id="form"></label>
          {/* <label id="form">Message: &nbsp;</label> */}
          <textarea
            type="text"
            defaultValue={message}
            onChange={handleChange}
            className="text-area"
          ></textarea>
        </div>
        <br></br>
        <button className="send-button" type="submit">Send</button>
      </form>
    </>
  );
};

export default ChatBox;
