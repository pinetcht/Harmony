import React from 'react'
import '../styles/inbox.css'
import { FaArrowRight } from "react-icons/fa";

const ChatCard = ({ chat, setSelectedChatId }) => {

    return (
        <button onClick={() => setSelectedChatId(chat.id)} className="chat-card-container">
            {chat.receivers.map((u, index) => 
                <div key={index} className="receiver-info" id="username">
                    <img src={u.profilepic} width="50px" className="chat-card-profile-pic"/>
                    {u.username}
                </div>
            )}
            <h4 className="recent-message"> {chat.recentmessage} </h4>
            <FaArrowRight color="white" className="arrow"size={45} />
        </button>
        
    )
}

export default ChatCard