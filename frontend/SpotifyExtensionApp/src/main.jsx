import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
// import { createBrowserRouter, RouterProvider} from "react-router-dom";
import { BrowserRouter, Route, Routes, useLocation, useNavigate } from 'react-router-dom';

import Discover from "./roots/Discover.jsx";
import Inbox from "./roots/Inbox.jsx";
import Forum from "./roots/Forum.jsx";
import Library from "./roots/Library.jsx";
import Landing from "./roots/Landing.jsx";
import UserProfile from "./roots/UserProfile.jsx";
import UserProfileOther from './roots/UserProfileOther.jsx';

import { AuthProvider } from "./components/AuthContext.jsx";

const RootApp = () => {
	const location = useLocation();
	const navigate = useNavigate();

	return (
		<AuthProvider location={location} navigate={navigate}>
			<Routes>
				<Route path="/" element={<Discover />} />
				<Route path="/Inbox" element={<Inbox />} />
				<Route path="/Forum" element={<Forum />} />
				<Route path="/Library" element={<Library />} />
				<Route path="/UserProfile" element={<UserProfile />} />
				<Route path="/user/:otherDocID" element={<UserProfileOther />} />
			</Routes>
		</AuthProvider>
	);
};

ReactDOM.createRoot(document.getElementById('root')).render(
      <BrowserRouter> 
        <RootApp />
      </BrowserRouter>
)
