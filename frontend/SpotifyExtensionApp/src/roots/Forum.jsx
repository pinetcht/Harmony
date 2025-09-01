import React, { useEffect, useState } from 'react';
import NavBar from '../components/NavBar.jsx';
import axios from 'axios';
import ForumCard from '../components/ForumCard.jsx';
import { FaArrowLeft } from "react-icons/fa";
import '../styles/forum.css'
import Discussion from '../components/Discussion.jsx';
const API_BASE = import.meta.env.VITE_API_BASE_URL;

const Forum = () => {
  const [forumData, setForumData] = useState(null);
  const [individualForumId, setIndividualForumId] = useState(null);

  const fetchForums = async () => {
    try {
      const response = await axios.get(`${API_BASE}/forum`);
      console.log("forums: ", response.data);
      setForumData(response.data);
    } catch (error) {
      console.error("Error fetching forums:", error);
    }
  };

  useEffect(() => {
    fetchForums();
  }, [ individualForumId ]);

  const handleForumCardClick = (forumId) => {
    // Set the individual forum id
    setIndividualForumId(forumId);
  };

  const handleBackButtonClick = () => {
    // Reset the individual forum id to null
    setIndividualForumId(null);
  };

  return (
    <>
      <NavBar />
      <div className="page-container">
        <h1>Join The Chorus</h1>
        
        {individualForumId ? (
          <>
            <button  onClick={handleBackButtonClick} className="back-button" >
              <FaArrowLeft color="white" size={45} />
            </button>
            <Discussion forumId={individualForumId} />
          </>
        ) : (
          forumData &&
          forumData.map((forum) => (
            <div key={forum.id}>
              <ForumCard data={forum} handleForumCardClick={handleForumCardClick}/>
            </div>
          ))
        )}
      </div>
    </>
  );
}

export default Forum;
