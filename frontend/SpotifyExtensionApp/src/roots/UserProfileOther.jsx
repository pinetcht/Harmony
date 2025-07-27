import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../components/AuthContext';
import '../styles/userProfile.css';
import axios from 'axios';
import { useParams } from 'react-router-dom';


const UserProfileOther = () => {

  const { otherDocID } = useParams(); // getting other userId from URL

  const [userData, setUserData] = useState(null);
  const [allTimeSongs, setAllTimeSongs] = useState(null);
  const [topArtistsYear, setTopArtistsYear] = useState(null);
  const [albums, setAlbums] = useState(null);

  // State for display preferences
  const [isPrivate, setIsPrivate] = useState(false);

  const fetchUserData = async () => {
    const response = await axios.get(`http://localhost:8000/users/${otherDocID}`);
    console.log('other doc id ', otherDocID)
    console.log(response.data);
    if (otherDocID) {
      setUserData(response.data);
      setAllTimeSongs(response.data.allsongs);
      setTopArtistsYear(response.data.topArtistYear);
      setAlbums(response.data.savedalbums);
      setIsPrivate(!response.data.public);
    }
  }

  const handleFollow = async (currentFollowers) => {
    const response = await axios.put(`http://localhost:8000/users/follower/${otherDocID}`, {
      userId: otherDocID,
      followers: currentFollowers,
    });
    fetchUserData();
  }


  useEffect(() => {
    fetchUserData();
    console.log('saved albums ', savedAlbums)
  }, [otherDocID])

  const topSongs = [];
  const topArtists = [];
  const savedAlbums = []
  if (userData) {
    for (let i = 0; i < 4; i++) {
      topSongs.push(allTimeSongs[i]);
      if (topArtistsYear && topArtistsYear.length > 0) {
        topArtists.push(topArtistsYear[i]);
      }

      if (albums && albums.length > 0) {
        savedAlbums.push(albums[i]);
      }

    }
    console.log('top songs ', topSongs)
  }

  return (
    <>
      <a href="/Discover" className="back-button-link">
        <button className="profile-button" style={{ width: "60px", height: "30px" }}>
          <img src="/backarrow.png" alt="Back"></img>
        </button>
      </a>
      {isPrivate ? (
        <div className="private-message">
          <h2> User's Profile is Private </h2>
        </div>
      ) : (
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
              <h3> {userData && userData.username} </h3>
              <h6> {userData && userData.followercount} Followers | {userData && userData.followedArtistsCount} Artists Following </h6>
              {isPrivate ? (<h6> Private </h6>) : (<h6> Public </h6>)}
              <div className="button-container">
                <button onClick={() => handleFollow(userData.followercount)} className="profile-button"> Follow </button>
                <a href="/Inbox" style={{ textDecoration: "none" }}>
                  <button className="profile-button"> Message </button>
                </a>
              </div>
            </div>
          </div>
          <h4 className="content-header"> Top Liked Songs </h4>
          <div className="content-container">
            {topSongs && topSongs.map((song) => (
              song && (
                <div className="songs">
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
              )
            ))}
          </div>
          <h4 className="content-header"> Top Artists </h4>
          <div className="content-container">
            {topArtists && topArtists.map((artist) => (
              artist && (
                <div className="artists">
                  <img className="artist-image" src={artist.artistimage}></img>
                  <div className="song-name">
                    {artist.artistname}
                  </div>
                </div>
              )
            ))}
          </div>
          <h4 className="content-header"> Saved Albums </h4>
          <div className="content-container">
            {savedAlbums && savedAlbums.map((album) => (
              album && (
                < div className="albums" >
                  <img src={album.albumimage} alt={album.albumname} className="artist-image"></img>
                  <div className="album-name">
                    {album.albumname}
                    <div className="artist-name" style={{ fontWeight: "normal" }}>
                      {album.artistname[0].name}
                    </div>
                  </div>
                </div>
              )

            ))}
          </div>
        </div >
      )}
    </>

  );
}

export default UserProfileOther;