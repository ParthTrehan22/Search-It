import React from 'react'
import "../styles/SearchBar.css";
import { useState} from 'react'
import ShowImages from "./ShowImages"

function SearchBar(props) {
    const [search, setSearch] = useState("");
    const [state, setState] = useState("To be Searched");
    if (state === "To be Searched") {
        return (
            <div className="Search-bar">
                <div className="Search-field">
                    <input type="search" placeholder="Enter your query..." onChange={(e) => {
                        setSearch(e.target.value);
                    }} />
                </div>
                <div className="Search-button">
                    <a href="#" onClick={() => {
                        setState("Search");
                    }} >Search It!</a>
                </div>
            </div>
        )
    }
    else {
        return(
            <div className="">
            <div className="Search-bar">
                <div className="Search-field">
                    <input type="search" placeholder="Enter your query..." onChange={(e) => {
                        setSearch(e.target.value);
                        setState("To be Searched");
                    }} />
                </div>
                <div className="Search-button">
                    <a href="#" onClick={() => {
                        setState("Search");
                    }} >Search It!</a>
                </div>
            </div>
            <div className="Card-container">
                <ShowImages search={search}></ShowImages>
            </div>
            </div>
        )
    }

}

export default SearchBar;
