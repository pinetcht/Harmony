# Spotify Extension Harmony 🎵
Description: A Spotify extension that allows users to message each other and post to forums. <br>
Authors: Tiffany Fu, Pine Netcharussaeng, Abhinav Attaluri, Anna Batman , Anh Nguyen

## Table of Contents
1. [Installation](#installation)
2. [Features](#features)
3. [Tutorial](#tutorial)

### Installation
To run our app follow these steps

1. Clone the repo
```bash
git clone {repo url}
```
2. Run the frontend code
```bash
cd frontend/SpotifyExtensionApp
npm install
npm run dev
```
2. Run the backend code
```bash
cd backend
npm install
npm install dotenv cors express cookie-parser request firebase
npm start
```

In the backend folder add these files
#### .env
Create an .env following this template
Retrieve Client Secret and Client ID by registering an app with 
<a href="https://developer.spotify.com/documentation/web-api/tutorials/getting-started#create-an-app">
Spotify for Developers </a>

```js
CLIENT_ID = {Client ID}
CLIENT_SECRET = {Client Secret}
```

#### permissions.json
Set up a project with Firebase to setup permissions.json file
1. Go to <a href=https://console.firebase.google.com/>Firebase Console </a>
2. Choose "Add Project"
3. Create a Firestore Database
4. Add Web App to Firebase Project
5. Go to Project Settings and Generate New Private Key
```js
{
    "type": {type},
    "projectId": {project ID},
    "private_key_id": {private Key ID},
    "private_key": {private key},
    "client_email": {client email},
    "client_id": {client ID},
    "auth_uri": {auth URI},
    "token_uri": {token URI},
    "auth_provider_x509_cert_url": {auth provider},
    "client_x509_cert_url": {cert URL},
    "universe_domain": "googleapis.com"
}
```

### Features
1. Sign In to Spotify on Landing Page (WIP)
2. Find all Users on Discover Page (WIP)
3. Chat with Other Users in Inbox (WIP)
4. View and Post to Discussion Forums (WIP)
5. View Profiles of All Users (WIP)
6. User Profiles Display Users Top Songs, Top Artists, and Active Discussion Forums (WIP)
- Ability To Toggle Between Public and Private Profile
- Ability to Display or Hide Top Songs, Artists, and Discussion Forums Categories
7. View Your Saved Songs, Artists, and Albums in the Library (WIP)
- See your Tops Songs over Different Periods of Time

### Tutorial
1. Log In with Your Spotify Account Information
2. Use the Navigation Bar to View Different Pages
3. View Your Profile by clicking on the Top Rightside Icon on Discover Page
4. View Other Users Profiles and Message them by clicking on the Message button
5. See All Conversations and Chat with Specific Users by clicking on a card in Inbox
6. View Discussion Forums surrounding popular Albums on Spotify
7. See Artist Message and Like or Reply to a Specific Discussion
8. Toggle Between Your Saved Songs, Artists, and Albums and Sort by Top Listens in The Library

### Credits
Authors: Tiffany Fu, Pine, Abhinav, Anna, Anh
This project was completed as a part of Forge Launch SWE Training. Special Thanks to TA's Simon Anderson, and Byron Richards, and Alum Instructor Mitch Gillin. 
