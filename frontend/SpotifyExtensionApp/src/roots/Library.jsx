import React, { useContext, useEffect, useState } from "react";
import NavBar from "../components/NavBar.jsx";
import { AuthContext } from "../components/AuthContext.jsx";
import axios from "axios";
import SearchBar from "../components/SearchBar.jsx";
import "../styles/library.css";
import { Select } from "@chakra-ui/react";

const Library = () => {
    const [userData, setUserData] = useState("");
    const [savedSongs, setSavedSongs] = useState([]);
    const [artists, setArtists] = useState([]);
    const [albums, setAlbums] = useState([]);
    const headerStyle = { margin: "30px 30px 30px 0px", color: "#FFFFFF" };
    const [activeTab, setActiveTab] = React.useState("artists");
    const divStyle = { display: "flex" };
    const [searchResults, setSearchResults] = useState([]);

    const [topArtistsSixMonth, setTopArtistsSixMonth] = useState([]);
    const [topArtistsMonth, setTopArtistsMonth] = useState([]);
    const [topArtistsYear, setTopArtistsYear] = useState([]);

    const [topSongsSixMonth, setTopSongsSixMonth] = useState([]);
    const [topSongsMonth, setTopSongsMonth] = useState([]);
    const [topSongsYear, setTopSongsYear] = useState([]);

    const [artistFilterAppliedYear, setArtistFilterAppliedYear] =
        useState(false);
    const [artistFilterAppliedMonth, setArtistFilterAppliedMonth] =
        useState(false);
    const [artistFilterAppliedSixMonth, setArtistFilterAppliedSixMonth] =
        useState(false);

    const [songsFilterAppliedYear, setSongsFilterAppliedYear] = useState(false);
      const [songsFilterAppliedSixMonth, setSongsFilterAppliedSixMonth] =
          useState(false);
    const [songsFilterAppliedMonth, setSongsFilterAppliedMonth] =
        useState(false);
  

    const docID = localStorage.getItem("docID");
    console.log(docID);

    const fetchUser = async () => {
        const response = await axios.get(
            `http://localhost:8000/users/${docID}`
        );
        setUserData(response.data);
        setSavedSongs(response.data.allsongs);
        setArtists(response.data.allFollowedArtists);
        setAlbums(response.data.savedalbums);

        setTopArtistsSixMonth(response.data.topArtistHalfYear);
        setTopArtistsMonth(response.data.topArtistMonth);
        setTopArtistsYear(response.data.topArtistYear);

        setTopSongsSixMonth(response.data.topSongHalfYear);
        setTopSongsMonth(response.data.topSongMonth);
        setTopSongsYear(response.data.topSongYear);
    };

    function search(category, input) {
        if (category == "songs") {
            const results = [];
            savedSongs.forEach();
            results.push(
                savedSongs.artistname.filter((str) => str.includes(input))
            );
            results.push(
                savedSongs.songname.filter((str) => str.includes(input))
            );
            results.push(
                savedSongs.albumname.filter((str) => str.includes(input))
            );
            setSearchResults(results);
        }

        if (category == "artist") {
            const results = [];
            results.push(
                savedSongs.artistname.filter((str) => str.includes(input))
            );
            setSearchResults(results);
        }

        if (category == "albums") {
            const results = [];
            results.push(albums.albumname.filter((str) => str.includes(input)));
            results.push(
                albums.artistname.filter((str) => str.includes(input))
            );
            setSearchResults(results);
        }
    }

    useEffect(() => {
        fetchUser();
    }, []);

    const handleChange = (event) => {
        const value = event.target.value;

        if (value === "songsByYear") {
            setSongsFilterAppliedYear(true);
            setSongsFilterAppliedSixMonth(false);
            setSongsFilterAppliedMonth(false);
            setArtistFilterAppliedMonth(false);
            setArtistFilterAppliedSixMonth(false);
            setArtistFilterAppliedYear(false);
        } 
        else if (value === "songsBySixMonth") {
            setSongsFilterAppliedYear(false);
            setSongsFilterAppliedSixMonth(true);
            setSongsFilterAppliedMonth(false);
            setArtistFilterAppliedMonth(false);
            setArtistFilterAppliedSixMonth(false);
            setArtistFilterAppliedYear(false);
        } 
        else if (value === "songsByMonth") {
            setSongsFilterAppliedYear(false);
            setSongsFilterAppliedSixMonth(false);
            setSongsFilterAppliedMonth(true);
            setArtistFilterAppliedMonth(false);
            setArtistFilterAppliedSixMonth(false);
            setArtistFilterAppliedYear(false);
        } 
        else if (value === "artistsByMonth") {
           setSongsFilterAppliedYear(false);
           setSongsFilterAppliedSixMonth(false);
           setSongsFilterAppliedMonth(false);
           setArtistFilterAppliedMonth(true);
           setArtistFilterAppliedSixMonth(false);
           setArtistFilterAppliedYear(false);
        } 
        else if (value === "artistsBySixMonth") {
            setSongsFilterAppliedYear(false);
            setSongsFilterAppliedSixMonth(false);
            setSongsFilterAppliedMonth(false);
            setArtistFilterAppliedMonth(false);
            setArtistFilterAppliedSixMonth(true);
            setArtistFilterAppliedYear(false);
        } 
        else if (value === "artistsByYear") {
            setSongsFilterAppliedYear(false);
            setSongsFilterAppliedSixMonth(false);
            setSongsFilterAppliedMonth(false);
            setArtistFilterAppliedMonth(false);
            setArtistFilterAppliedSixMonth(false);
            setArtistFilterAppliedYear(true);
        } 
    };
   
    return (
        <>
            <NavBar />
            <div className="page-container">
                <h1>Your library</h1>
                <div>
                    <SearchBar
                        placeholder={"Search your " + activeTab + "..."}
                        //onSubmit={search(activeTab,input)}
                    />

                    {(activeTab === "songs" || activeTab === "artists") && (
                        <Select
                            bg="#f9bc60"
                            placeholder={"View top " + activeTab}
                            className="select"
                            style={{ paddingInlineEnd: "0px" }}
                            icon=""
                            onChange={handleChange}
                        >
                            {activeTab === "songs" && (
                                <>
                                    <option value="songsByYear">
                                        Top songs for last year
                                    </option>
                                    <option value="songsBySixMonth">
                                        Top songs for last 6 months
                                    </option>
                                    <option value="songsByMonth">
                                        Top songs for last month
                                    </option>
                                </>
                            )}

                            {activeTab === "artists" && (
                                <>
                                    <option value="artistsByYear">
                                        Top artists for last year
                                    </option>
                                    <option value="artistsBySixMonth">
                                        Top artists for last 6 months
                                    </option>
                                    <option value="artistsByMonth">
                                        Top artists for last month
                                    </option>
                                </>
                            )}
                        </Select>
                    )}

                    <div style={divStyle}>
                        <h2
                            className={`header-filter ${
                                activeTab === "artists" ? "active" : ""
                            }`}
                            onClick={() => setActiveTab("artists")}
                            style={headerStyle}
                        >
                            Artists
                        </h2>
                        <h2
                            onClick={() => setActiveTab("albums")}
                            className={`header-filter ${
                                activeTab === "albums" ? "active" : ""
                            }`}
                            style={headerStyle}
                        >
                            Albums
                        </h2>
                        <h2
                            onClick={() => setActiveTab("songs")}
                            className={`header-filter ${
                                activeTab === "songs" ? "active" : ""
                            }`}
                            style={headerStyle}
                        >
                            Songs
                        </h2>
                    </div>
                </div>
                {activeTab === "songs" && (
                    <>
                        {!songsFilterAppliedSixMonth
                            ? topSongsSixMonth.map((item, index) => (
                                  <div className="artist-container" key={index}>
                                      <img
                                          width="55"
                                          height="55"
                                          src={item.albumimage}
                                          alt="Artist photo"
                                      />
                                      <div className="text">
                                          <h3>{item.songname}</h3>
                                          <p>{item.artistname[0].name}</p>
                                      </div>
                                  </div>
                              ))
                            : !artistFilterAppliedMonth
                            ? topSongsMonth.map((item, index) => (
                                  <div className="artist-container" key={index}>
                                      <img
                                          width="55"
                                          height="55"
                                          src={item.albumimage}
                                          alt="Artist photo"
                                      />
                                      <div className="text">
                                          <h3>{item.songname}</h3>
                                          <p>{item.artistname[0].name}</p>
                                      </div>
                                  </div>
                              ))
                            : !songsFilterAppliedYear
                            ? topSongsYear.map((item, index) => (
                                  <div className="artist-container" key={index}>
                                      <img
                                          width="55"
                                          height="55"
                                          src={item.albumimage}
                                          alt="Artist photo"
                                      />
                                      <div className="text">
                                          <h3>{item.songname}</h3>
                                          <p>{item.artistname[0].name}</p>
                                      </div>
                                      
                                  </div>
                              ))
                            : savedSongs.map((item, index) => (
                                  <div className="song-container" key={index}>
                                      <img
                                          src={item.albumimage}
                                          width="55"
                                          height="55"
                                          alt="Album cover"
                                      />
                                      <div className="text">
                                          <h3>{item.songname}</h3>
                                          <p>{item.artistname[0].name}</p>
                                      </div>
                                  </div>
                              ))}
                    </>
                )}

                {activeTab === "albums" &&
                    albums.map((item, index) => (
                        <div className="album-container" key={index}>
                            <img
                                width="55"
                                height="55"
                                src={item.albumimage}
                                alt="Album cover"
                            />
                            <div className="text">
                                <h3>{item.albumname}</h3>
                                <p>{item.artistname[0].name}</p>
                            </div>
                        </div>
                    ))}
                {activeTab === "artists" && (
                    <>
                        {!artistFilterAppliedYear
                            ? topArtistsYear.map((item, index) => (
                                  <div className="artist-container" key={index}>
                                      <img
                                          width="55"
                                          height="55"
                                          src={item.artistimage}
                                          alt="Artist photo"
                                      />
                                      <h3>{item.artistname}</h3>
                                  </div>
                              ))
                            : !artistFilterAppliedMonth
                            ? topArtistsMonth.map((item, index) => (
                                  <div className="artist-container" key={index}>
                                      <img
                                          width="55"
                                          height="55"
                                          src={item.artistimage}
                                          alt="Artist photo"
                                      />
                                      <h3>{item.artistname}</h3>
                                  </div>
                              ))
                            : !artistFilterAppliedSixMonth
                            ? topArtistsSixMonth.map((item, index) => (
                                  <div className="artist-container" key={index}>
                                      <img
                                          width="55"
                                          height="55"
                                          src={item.artistimage}
                                          alt="Artist photo"
                                      />
                                      <h3>{item.artistname}</h3>
                                  </div>
                              ))
                            : artists.map((item, index) => (
                                  <div className="artist-container" key={index}>
                                      <img
                                          width="55"
                                          height="55"
                                          src={item.artistimage}
                                          alt="Artist photo"
                                      />
                                      <h3>{item.artistname}</h3>
                                  </div>
                              ))}
                    </>
                )}
            </div>
        </>
    );
};

export default Library;
