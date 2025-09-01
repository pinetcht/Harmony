import { useState, useEffect, useContext } from "react";
import React from 'react'
import NavBar from '../components/NavBar.jsx';
import SearchBar from '../components/SearchBar.jsx'
import ProfileCard from '../components/ProfileCard.jsx';
import axios from 'axios';
import { AuthContext } from '../components/AuthContext.jsx';
import '../styles/discover.css'
const API_BASE = import.meta.env.VITE_API_BASE_URL;

const Discover = () => {
  //fetch all users from Firestore and set to userData
  const { userID, userName, docID } = useContext(AuthContext);
  const [userData, setUserData] = useState(null);
  const [filteredUsers, setFilteredUsers] = useState(null)
  const [currentUser, setCurrentUser] = useState(null);
  const [searchInput, setSearchInput] = useState("");

  const fetchUsers = async () => {
    const response = await axios.get(`${API_BASE}/users`);
    setUserData(response.data);
  };

  const fetchCurrentUser = async () => {
    const responseUser = await axios.get(`${API_BASE}/users/${docID}`);
    setCurrentUser(responseUser.data);
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    fetchCurrentUser();
    console.log(userData)
  }, [userData]);


  // filter when searchInput changes
  useEffect(() => {
    if (!userData) return;
    if (searchInput.trim() === "") {
      setFilteredUsers(userData);
    } else {
      const filtered = userData.filter((eachUser) =>
        eachUser.username.toLowerCase().startsWith(searchInput.toLowerCase())
      );

      setFilteredUsers(filtered);
    }
  }, [searchInput, userData]);


  // will display default orange background if profilepic is null for user
  let isProfilePic = false;
  if (currentUser && currentUser.profilepic) {
    isProfilePic = true;
  }

  return (
    <>
      <NavBar />
      <div className="page-container">
        <div className="top-discover-page">
          <div>
            <h1>Find Your Band</h1>
            <SearchBar placeholder="Search Spotify Users..." input={searchInput} setInput={setSearchInput} />
            {/* <SearchBar placeholder="Search Spotify Users..." /> */}
          </div>
          <a href="/UserProfile">
            <div className="userProfile">
              {isProfilePic ? (
                <div>
                  <img className="userProfilePic" src={currentUser.profilepic} alt="Profile Pic"></img>
                </div>
              ) : (
                <div className="userProfilePic"></div>
              )}
              {
                currentUser && <h4>{currentUser.username}</h4>
              }

            </div>
          </a>
        </div>
        <div>
          <h1 style={{ marginTop: "100px" }}>Based On Your Groove</h1>
          <div className="user-cards-container">
            {filteredUsers && filteredUsers.map((user, index) => {
              if (user.userid !== userID && user.public)
                return <ProfileCard key={index} profileData={user} variant="user" />
            })}
          </div>
        </div>
      </div>
    </>
  )
}

export default Discover
