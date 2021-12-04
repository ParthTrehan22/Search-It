import React from 'react'
import searchIcon from "../images/search.png"
import "../styles/Header.css"
import { useState, useEffect, useRef } from 'react'
import { createApi } from "unsplash-js"
import { debounce } from "lodash"
import { BounceLoader } from 'react-spinners'

const unsplash = createApi({
    accessKey: "MZg0kz21lnxkcsvvhr-zOIC_5zJq3RDw59NB0FXrdSc"
})

function Header() {
    const [search, setSearch] = useState("");
    const searchRef = useRef(search)
    const [images, setImages] = useState([])
    const imagesRef = useRef(images)
    const [fetching, setFetching] = useState(false)
    const fetchingRef = useRef(fetching)

    function handleSearch(e) {
        setSearch(e.target.value)
    }

    function getUnsplashImages(query, page = 1) {
        setFetching(true)
        fetchingRef.current = fetching
        return new Promise((resolve, reject) => {
            unsplash.search.getPhotos({
                query,
                page,
                perPage: 10,
                w: 200,
                fit: "max"
            }).then(result => {
                setFetching(false)
                fetchingRef.current = fetching
                resolve(result.response.results.map(result => result.urls.regular))
            })
        })
    }

    useEffect(() => {
        searchRef.current = search
        if (search !== "") {
            debounce(() => {
                setImages([])
                getUnsplashImages(search, 1).then(images => {
                    setImages(images);
                    imagesRef.current = images
                })
            }, 1000)();
        }
    }, [search])

    function handleScroll(e) {
        const { scrollHeight, scrollTop, clientHeight } = e.target.scrollingElement;
        const isBottom = scrollHeight - scrollTop <= clientHeight
        if (isBottom && !fetchingRef.current) {
            getUnsplashImages(searchRef.current, imagesRef.current.length / 10 + 1).then(
                newImages => {
                    imagesRef.current = [...imagesRef.current, ...newImages];
                    setImages(imagesRef.current)
                }
            )
        }
    }
    useEffect(() => {
        document.addEventListener('scroll', handleScroll, { passive: true })
        return () => document.removeEventListener("scroll", handleScroll)
    }, [])

    return (
        <div className="app">
            <div className="header">
                <div className="left_header">
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9eF3AdDg-2a3ZuIuD-7voOtscmwtaoViPSA&usqp=CAU" alt="logo" />
                    <h2>Search It!</h2>
                </div>
                <div className="right_header">
                    <div className="searchIcon">
                        <img src={searchIcon} alt="search_logo" />
                    </div>
                    <div className="inputBar">
                        <input type="search" placeholder="Enter your Search ..." onChange={handleSearch} />
                    </div>
                </div>
            </div>
            <div className="Main">
                <div className="imagesContainer">
                    {images.length > 0 && images.map(url => (
                        <div className="image">
                            <img src={url} alt="image" />
                        </div>
                    ))}
                </div>
                <div className="bounceLoader">
                    {fetching && <BounceLoader speedMultiplier={5} color={"#000000"}></BounceLoader>}
                </div>
            </div>
        </div>
    )
}

export default Header
