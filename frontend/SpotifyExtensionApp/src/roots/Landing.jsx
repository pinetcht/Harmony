import React, { useContext, useEffect } from 'react';
import { AuthContext } from '../components/AuthContext';
import { useNavigate } from 'react-router-dom';
import '../styles/Landing.css';

const Landing = () => {
  
  const { accessToken } = useContext(AuthContext);

  const navigate = useNavigate();

  useEffect(() => {
    if (accessToken) {
      navigate('/Discover');
    }
  }, [accessToken, navigate])


  const handleLogin = () => {
    window.location.href = 'http://127.0.0.1:8000/login';
  };

  return (
    <div className="landingpage-container">
      <img src="/spotifylogo.png" alt="Spotify Logo"></img>
      <h1 className="landing-header"> Welcome Back </h1>
      <h3 className="landing-sub"> Find your Groove </h3>
      {!accessToken && (
        <button className="login-button" onClick={handleLogin}>Log in with Spotify</button>
      )} 
    </div>
  );
  
}

export default Landing