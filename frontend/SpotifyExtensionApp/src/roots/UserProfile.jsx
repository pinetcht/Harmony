import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../components/AuthContext';
import '../styles/userProfile.css';
import EditProfileModal from '../components/EditProfileModal';
import axios from 'axios';


const UserProfile = ({ userId }) => {
  const { userID, userName, docID } = useContext(AuthContext);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [userData, setUserData] = useState(null);
  const [allTimeSongs, setAllTimeSongs] = useState(null);
  const [topArtistsYear, setTopArtistsYear] = useState(null);
  const [albums, setAlbums] = useState(null);

  // State for display preferences
  const [isPrivate, setIsPrivate] = useState(false);
  const [displayTopArtists, setDisplayTopArtists] = useState(true);
  const [displayTopSongs, setDisplayTopSongs] = useState(true);
  const [displaySavedAlbums, setDisplaySavedAlbums] = useState(true);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const fetchUserData = async () => {
    console.log(docID);
    if (docID) {
      const response = await axios.get(`http://localhost:8000/users/${docID}`);
      setUserData(response.data);
      setAllTimeSongs(response.data.allsongs);
      setTopArtistsYear(response.data.topArtistYear);
      setAlbums(response.data.savedalbums);

    }
  }

  useEffect(() => {
    fetchUserData();
  }, [docID, userID])

  const topSongs = [];
  const topArtists = [];
  const savedAlbums = []
  if (userData) {
    for (let i = 0; i < 4; i++) {
      topSongs.push(allTimeSongs[i]);
      topArtists.push(topArtistsYear[i]);
      savedAlbums.push(albums[i]);
    }
  }

  return (
    <>
      <a href="/Discover" className="back-button-link"> 
        <button className="profile-button" style={{width:"60px", height:"30px"}}> 
          <img src="/backarrow.png" alt="Back"></img>
        </button> 
      </a>
      <div className="main-container"> 
        <div className="profileContainer"> 
                {userData && userData.profilepic ? (
                  <div>
                    <img className="profilePic" src={userData.profilepic} alt="Profile Pic"></img>
                  </div>
                ) : (
                  <div className="profilePic"></div>
                )}
              <div className="profileBio"> 
                <h3> {userName} </h3>
                <h6> {userData && userData.followercount} Followers | {userData && userData.followedArtistsCount} Artists Following </h6>
                {isPrivate ? ( <h6> Private </h6>) : ( <h6> Public </h6>)}
                <div className="button-container"> 
                  <button onClick={toggleModal} className="profile-button"> Edit Profile </button>
                  <a href="/Inbox" style={{textDecoration:"none"}}> 
                    <button className="profile-button"> Inbox </button>
                  </a>
                </div>
              </div>
        </div>
        {displayTopSongs && (
          <>
            <h4 className="content-header"> Top Liked Songs </h4> 
            <div className="content-container"> 
              {topSongs && topSongs.map((song) => (
                <div key = {song.songname} className="songs"> 
                  <img className="song-album-cover" src={song.albumimage} alt="album cover"></img>
                  <div className="song-text">
                    <div className="song-name"> 
                      {song.songname}
                    </div>
                    <div className="artist-name">
                      {song.artistname[0].name}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
        {displayTopArtists && (
          <> 
            <h4 className="content-header"> Top Artists </h4>
            <div className="content-container"> 
            {topArtists && topArtists.map((artist) => (
              <div key = {artist.artistname} className="artists"> 
                <img className="artist-image" src={artist.artistimage}></img>
                <div className="song-name"> 
                  {artist.artistname}
                </div>
              </div>
            ))}
            </div>
          </>
        )}
        {displaySavedAlbums && (
          <> 
            <h4 className="content-header"> Saved Albums </h4>
            <div className="content-container"> 
            {savedAlbums && savedAlbums.map((album) => (
            <div className="albums" key={album.albumid}> 
              <img src={album.albumimage} alt="Album cover" className="artist-image"></img>
              <div className="album-name"> 
                {album.albumname}
                <div className="artist-name" style={{fontWeight: "normal"}}> 
                  {album.artistname[0].name}
                </div>
              </div>
            </div>
            ))}
            </div>
          </>
        )}
      </div>

      {isModalOpen && <EditProfileModal 
                        toggleModal={toggleModal}
                        isPrivate={isPrivate}
                        displayTopSongs={displayTopSongs}
                        displayTopArtists={displayTopArtists}
                        displaySavedAlbums={displaySavedAlbums}
                        setIsPrivate={setIsPrivate}
                        setDisplayTopSongs={setDisplayTopSongs}
                        setDisplayTopArtists={setDisplayTopArtists}
                        setDisplaySavedAlbums={setDisplaySavedAlbums} 
                      />}
    </>
          
  )
}

export default UserProfile;
