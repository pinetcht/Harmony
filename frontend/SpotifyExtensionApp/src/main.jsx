import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
// import { createBrowserRouter, RouterProvider} from "react-router-dom";
import { BrowserRouter, Route, Routes, useLocation, useNavigate } from 'react-router-dom';

import Discover from "./roots/Discover.jsx";
import Inbox from "./roots/Inbox.jsx";
import Forum from "./roots/Forum.jsx";
import Library from "./roots/Library.jsx";
import Landing from "./roots/Landing.jsx";
import UserProfile from "./roots/UserProfile.jsx";

import { AuthProvider } from "./components/AuthContext.jsx";

const RootApp = () => {
	const location = useLocation();
	const navigate = useNavigate();

	return (
		<AuthProvider location={location} navigate={navigate}>
			<Routes>
				<Route path="/" element={<Landing />} />
				<Route path="/Discover" element={<Discover />} />
				<Route path="/Inbox" element={<Inbox />} />
				<Route path="/Forum" element={<Forum />} />
				<Route path="/Library" element={<Library />} />
				<Route path="/UserProfile" element={<UserProfile />} />
			</Routes>
		</AuthProvider>
	);
};

ReactDOM.createRoot(document.getElementById('root')).render(
  	<React.StrictMode>
    	<BrowserRouter> 
        <RootApp />
      </BrowserRouter>
  	</React.StrictMode>,
)


// const router = createBrowserRouter([
// 	{
// 		path: "/",
// 		element: <Landing />,
// 	},
// 	{
// 		path: "/Discover",
// 		element: <Discover />,
// 	},
// 	{
// 		path: "/Inbox",
// 		element: <Inbox />,
// 	},
// 	{
// 		path: "/Forum",
// 		element: <Forum/>,
// 	},
// 	{
// 		path: "/Library",
// 		element: <Library />,
// 	},
// ]);