import React from 'react'
import Header from './Header'
import SearchBar from './SearchBar'
import useSearchImages from './useSearchImages'
import { useState, useRef, useCallback } from 'react'

function HomePage() {
    const [query, setQuery] = useState("");
    const [pageNumber, setPageNumber] = useState(1)
    const { images, hasMore, loading, error } = useSearchImages(query, pageNumber)
    const observer = useRef()
    const lastImageRef = useCallback(node => {
        if(loading) return
        if(observer.current) observer.current.disconnect()
        observer.current = new IntersectionObserver(entries => {
            if(entries[0].isIntersecting && hasMore){
                setPageNumber(prevPageNumber => prevPageNumber+1)
            }
        })
        if(node) observer.current.observe(node)
        console.log(node)
    }, [loading, hasMore])

    function handleSearch(e) {
        setQuery(e.target.value)
        setPageNumber(1)
    }
    
    return (
        <div className="HomePage">
            <Header></Header>
            <input className="Search-Bar"type="search" value={query} placeholder="Enter your query..." onChange={handleSearch} />
            {images.map((image, index) => {
                if (images.length === index + 1) {
                    return <img ref={lastImageRef} src={image} alt="image" />
                } else {
                    return <img src={image} alt="image" />
                }
            })}
            <div>{loading && "Loading ...."}</div>
            {/* <SearchBar></SearchBar> */}
        </div>
    )
}

export default HomePage
