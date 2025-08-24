import React from 'react'
import { IoIosSearch } from "react-icons/io";

const SearchBar = ({placeholder,input,setInput }) => {

  const styles = {
    container: {
      display: "flex",
      backgroundColor: "#3A6160",
      borderRadius: "20px",
      width: "450px",
      height: "60px",
      verticalAlign: "middle"
    },
    searchIcon: {
      margin: "5px 0px 0px 5px",
      color: "white"
    },
    input: {
      background: "transparent",
      border: "none",
      fontSize: "22px",
      color: "white",

      "&:focus": {
        outline: "none"
      }
    }
  };
  React.useEffect (() => {console.log(input)},[input]);

  return (
    <div className="container" style={styles.container}>
      <IoIosSearch className="search-icon" style={styles.searchIcon} size={50} />
      <input type="text" placeholder={placeholder} style={styles.input} onChange={(e) => setInput(e.target.value)}></input>
    </div>
  )
}

export default SearchBar
