import React, { useContext, useState } from 'react'
import '../styles/forum.css'
import { AuthContext } from './AuthContext';
import axios from 'axios';
const API_BASE = import.meta.env.VITE_API_BASE_URL;
const ReplyBox = ({ setClickReply, forumId, setNewPost }) => {
    const [inputValue, setInputValue] = useState('');
    const { docID } = useContext(AuthContext);
    
    const postReply = async () => {
        await axios.post(`${API_BASE}/forum/replies/${forumId}`, {
            id: forumId,
            createdAt: new Date().getTime(),
            message: inputValue,
            userId: docID,
        });
    }

    const handelPost = () => {
        if (inputValue) {
            postReply();
        }
        setNewPost(true);
        setClickReply(false);
    }

    return (
        <div className="reply-box-container">
            <button className="cancel-button" onClick={() => setClickReply(false)}>Cancel</button>
            <div>
                <input type="text"
                    placeholder="Type a Response..."
                    className="reply-input"
                    onChange={(event) => setInputValue(event.target.value)}
                >
                </input>
                <button onClick={() => handelPost()} type="button" className="post-button">Post</button>
            </div>
        </div>
    )
}

export default ReplyBox