import axios from 'axios';
import React, { useEffect, useState } from 'react'
import ReplyCard from './ReplyCard';
import { FaRegHeart, FaHeart } from "react-icons/fa";
import ReplyBox from './ReplyBox';
const API_BASE = import.meta.env.VITE_API_BASE_URL;

const Discussion = ({ forumId }) => {
    const [forumData, setForumData ] = useState(null);
    const [like, setLike] = useState(false);
    const [clickReply, setClickReply] = useState(false);
    const [newPost, setNewPost] = useState(false);

    const fetchForum = async () => {
        const response = await axios.get(`${API_BASE}/forum/${forumId}`);
        setForumData(response.data);
    };

    useEffect(() => {
        fetchForum();
    }, []);

    useEffect(() => {
        setTimeout(() => { fetchForum() }, 500);
    }, [newPost]);

    const likeDiscussion = async () => {
        const response = await axios.put(`${API_BASE}/forum/${forumId}`,{
            currentLikes: forumData.likes,
        });
        fetchForum();
    };

    const handelLike = () => {
        setLike(!like);
        likeDiscussion();
    }

    return (
        <>
            {forumData &&
                <div>
                    <div className="discussion-title-card">
                        <img className="discussion-album-cover" width="200px" height="200px" src={forumData.albumcover} />
                        <div className="artist-message">
                            <p style={{ fontSize: "40px" }}>{forumData.albumname} by {forumData.artistmessage.name}</p>
                            <span style={{ fontSize: "30px", backgroundColor:"#F9BC60", padding:"3px" }}>
                                🌟From {forumData.artistmessage.name}: {forumData.artistmessage.message}
                            </span>
                        </div>
                        <div className="like-and-reply" >
                            <button className="like-button" onClick={() => handelLike()}>
                                {like ? <FaHeart color="white" size={25} /> : <FaRegHeart color="white" size={25} />}
                                <p style={{color: "white"}} id="likes-text">{forumData.likes}</p>
                            </button>
                            <button onClick={() => setClickReply(true)}
                                className = "reply-button" > Reply</button>
                        </div>
                    </div>
                </div>
            }

            {clickReply &&
                <ReplyBox setClickReply={setClickReply} forumId={forumId} setNewPost={setNewPost} />
            }
            
            {forumData && 
                <div>
                    <h1 style={{ margin: "20px 0px 8px 10px" }}>Replies ({forumData.replies.length})</h1>
                    <div className="replies-container">
                        {forumData.replies.map((reply, index) => 
                            <ReplyCard key={index} reply={reply} />
                        )}
                    </div>
                </div>
            }
        </>
  )
}

export default Discussion