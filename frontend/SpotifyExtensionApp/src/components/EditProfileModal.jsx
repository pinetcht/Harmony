import React from 'react';
import '../styles/editprofilemodal.css';
import Switch from 'react-switch';
import { IoMdClose } from "react-icons/io";
import axios from 'axios';
import { useContext } from 'react';
import { AuthContext } from './AuthContext';
const API_BASE = import.meta.env.VITE_API_BASE_URL;

const EditProfileModal = ({ 
  toggleModal,
  isPrivate,
  displayTopSongs,
  displayTopArtists,
  displaySavedAlbums,
  setIsPrivate,
  setDisplayTopSongs,
  setDisplayTopArtists,
  setDisplaySavedAlbums,
}) => {


    const { docID } = useContext(AuthContext);  
  // prevent scrolling in the background when modal is open
  document.body.classList.add('active-modal');

  const handleToggle = (setter, value) => {
    setter(!value);
  };

  const handlePrivacyToggle = async (value) => {
    setIsPrivate(!value);
    try {
        if(docID){
            await axios.put(`${API_BASE}/users/public/${docID}`, {
                userId : docID,
                public: value
            });
            console.log('Profile privacy updated successfully YAY');
        }
    } catch (error) {
      console.error('Error updating profile privacy:', error);
    }
  };


return (
    <div className="modal">
      <div onClick={toggleModal} className="overlay"></div>
      <div className="modal-content">
        <h2 style={{ fontSize: "2em"}}>Edit Profile</h2>
        <div className="option">
          <p>Private account</p>
          <Switch
            onChange={() => handlePrivacyToggle(isPrivate)}
            checked={isPrivate}
          />
        </div>
        <div className="option">
          <p>Display Top Artists</p>
          <Switch
            onChange={() => handleToggle(setDisplayTopArtists, displayTopArtists)}
            checked={displayTopArtists}
          />
        </div>
        <div className="option">
          <p>Display Top Songs</p>
          <Switch
            onChange={() => handleToggle(setDisplayTopSongs, displayTopSongs)}
            checked={displayTopSongs}
          />
        </div>
        <div className="option">
          <p>Display Saved Albums</p>
          <Switch
            onChange={() => handleToggle(setDisplaySavedAlbums, displaySavedAlbums)}
            checked={displaySavedAlbums}
          />
        </div>
        <button className="close-modal" onClick={toggleModal}>
          Save Changes
        </button>
        <button className="X-button" onClick = {toggleModal} >
            <IoMdClose />
            </button>
      </div>
    </div>
  );
};


export default EditProfileModal;