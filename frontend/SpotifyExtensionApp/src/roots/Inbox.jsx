import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar.jsx";
import ChatCard from "../components/ChatCard.jsx";
import { FaArrowLeft } from "react-icons/fa";
import SearchBar from "../components/SearchBar.jsx";
import axios from "axios";
import { AuthContext } from "../components/AuthContext.jsx";
import "../styles/inbox.css";
import ChatBox from "../components/ChatBox.jsx";
const API_BASE = import.meta.env.VITE_API_BASE_URL;

const Inbox = () => {
  const userID = "tgbhyx06nvXxk1UtPmHx";

  const [selectedChatId, setSelectedChatId] = useState("");
  const [chatData, setChatData] = useState(null);
  const [displayChats, setDisplayChats] = useState([]);
  const userChatIds = [];

  const fetchChatId = async (chatId) => {
    return await axios.get(`${API_BASE}/chat/${chatId}`);
  };

  const fetchMessageId = async (messageId) => {
    return await axios.get(`${API_BASE}/messages/${messageId}`);
  };

  const fetchUserId = async (userId) => {
    console.log("fetchUserId userId", userId);
    return await axios.get(`${API_BASE}/users/${userId}`);
  };

  const fetchAllChats = async () => {
    const response = await axios.get(`${API_BASE}/chat`);
    setChatData(response.data);
  };

  useEffect(() => {
    fetchAllChats();
  }, []);

  useEffect(() => {
    console.log('selectedChatId ', selectedChatId)
  }, [selectedChatId]);

  //find all chats current user is in
  //save all recievers of the chat
  const receivers = [];
  useEffect(() => {
    if (chatData) {
      chatData.forEach((chat) => {
        let messengers = chat.messengers;
        console.log("messengers", messengers);
        if (messengers.includes(userID)) {
          userChatIds.push(chat.id);
          for (var id of messengers) {
            if (id !== userID) {
              receivers.push(id);
            }
          }
        }
      });
    }
    console.log("userChatIds: ", userChatIds);
    console.log("receivers", receivers);
  }, [chatData]);

  const chatsWithUser = [];
  useEffect(() => {
    if (userChatIds) {
      for (let chatId of userChatIds) {
        console.log("chatid: ", chatId);
        fetchChatId(chatId).then((tempChat) => {
          console.log("tempchat: ", tempChat.data);

          fetchMessageId(
            tempChat.data.messages[tempChat.data.messages.length - 1]
          ).then((tempMessage) => {
            let lastMessage = "";
            let receiversArr = [];

            console.log("temp message: ", tempMessage.data);
            lastMessage = tempMessage.data.message;
            console.log("last message: ", lastMessage);

            // this will get userId of reciever of LAST message, instead get user from chatId :,(
            // for (let userId of tempMessage.data.receiverId) {
            for (let userId of receivers) {
              fetchUserId(userId).then((tempUser) => {
                console.log("helllo");
                receiversArr.push({
                  username: tempUser.data.username,
                  profilepic: tempUser.data.profilepic,
                });

                chatsWithUser.push({
                  id: chatId,
                  receivers: receiversArr,
                  recentmessage: lastMessage,
                });

                console.log("chatsWithUserAfter: ", chatsWithUser);
                setDisplayChats(chatsWithUser);
              });
            }
          });
        });
      }
    }
  }, [userChatIds]);

  return (
    <>
      <NavBar />
      <div className="page-container">
        <h1>Inbox</h1>

        {selectedChatId === "" && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginTop: "20px",
              marginBottom: "70px",
            }}
          >
            <SearchBar placeholder="Search Conversations..." />
          </div>
        )}

        {console.log("displaychats: ", displayChats)}

        {displayChats.length > 0 &&
          selectedChatId === "" &&
          displayChats.map((chat) => (
            <ChatCard
              key={chat.id}
              chat={chat}
              setSelectedChatId={setSelectedChatId}
            />
          ))}

        {selectedChatId !== "" && (
          <>
            <button
              onClick={() => setSelectedChatId("")}
              className="back-button"
            >
              <FaArrowLeft color="white" size={45} />
            </button>
            <ChatBox chatId={selectedChatId} />
          </>
        )}
      </div>
    </>
  );
};

export default Inbox;
