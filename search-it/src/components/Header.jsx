import React, { useMemo, useCallback } from "react";
import searchIcon from "../images/search.png";
import "../styles/Header.css";
import { useState, useEffect, useRef } from "react";
import { createApi } from "unsplash-js";
import { debounce } from "lodash";
import { BeatLoader } from "react-spinners";

import fetchImages from "./FetchImages";

function Header() {
  const [search, setSearch] = useState("");
  const searchRef = useRef(search);
  const [images, setImages] = useState([]);
  const imagesRef = useRef(images);
  const [fetching, setFetching] = useState(false);
  const fetchingRef = useRef(fetching);

  const handleSearch = useCallback(
    (e) => {
      const searchQuery = e.target.value;
      searchRef.current = searchQuery;
      setSearch(searchQuery);
    },
    [setSearch]
  );

  const debouncedChangeHandler = useMemo(() => debounce(handleSearch, 1000), [
    handleSearch,
  ]);

  const getUnsplashImages = useCallback(
    (query, page) => {
      setFetching(true);
      fetchingRef.current = true;

      return fetchImages(query, page).then((result) => {
        setFetching(false);
        fetchingRef.current = false;
        console.log(result);
        return result;
      });
    },
    [setFetching]
  );

  useEffect(() => {
    if (search !== "") {
      setImages([]);
      getUnsplashImages(search, 1).then((images) => {
        setImages(images);
        imagesRef.current = images;
      });
    }
  }, [search, setImages, getUnsplashImages]);

  const handleScroll = useCallback(
    (e) => {
      const {
        scrollHeight,
        scrollTop,
        clientHeight,
      } = e.target.scrollingElement;
      const isBottom = scrollHeight - scrollTop <= clientHeight;
      if (isBottom && !fetchingRef.current) {
        getUnsplashImages(
          searchRef.current,
          imagesRef.current.length / 30 + 1
        ).then((newImages) => {
          imagesRef.current = [...imagesRef.current, ...newImages];
          setImages(imagesRef.current);
        });
      }
    },
    [getUnsplashImages, setImages]
  );

  useEffect(() => {
    document.addEventListener("scroll", handleScroll, { passive: true });
    return () => document.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return (
    <div className="app">
      <div className="header">
        <div className="left_header">
          <img
            data-testid = "logo"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9eF3AdDg-2a3ZuIuD-7voOtscmwtaoViPSA&usqp=CAU"
            alt="logo"
          />
          <p>Search It!</p>
        </div>
        <div className="right_header">
          <div className="searchIcon">
            <img data-testid="searchLogo" src={searchIcon} alt="search_logo" />
          </div>
          <div className="inputBar">
            <input
              data-testid="input"
              type="search"
              placeholder="Search ..."
              onChange={debouncedChangeHandler}
            />
          </div>
        </div>
      </div>
      <div className="main">
        <div className="imagesContainer">
          {images.length > 0 &&
            images.map((url) => (
              <div key={url} className="image">
                <img data-testid="images" src={url} alt="image" />
              </div>
            ))}
        </div>
        <div className="loader">
          {fetching && <BeatLoader data-testid="BeatLoader" color={"#000000"} />}
        </div>
      </div>
    </div>
  );
}

export default Header;
