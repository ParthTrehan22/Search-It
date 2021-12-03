import React from 'react'
import { useEffect, useState } from 'react'
import axios, { Axios } from "axios"

function useSearchImages(query, pageNumber) {
    
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [images, setImages] = useState([])
    const [hasMore, setHasMore] = useState(false)

    useEffect(() => {
        setImages([])
    }, [query])

    useEffect(() => {
        setLoading(true)
        setError(false)
        let cancel
        axios({
            method:"GET",
            url:"https://api.unsplash.com/search/photos",
            params: { client_id:"MZg0kz21lnxkcsvvhr-zOIC_5zJq3RDw59NB0FXrdSc",
            page:pageNumber, 
            per_page:30,
            query:query,
            w: 200,
            fit: "max"},
            cancelToken: new axios.CancelToken(c => cancel = c)
        }).then(res =>{
            setImages(prevImages => {
                return [...new Set([...prevImages, ...res.data.results.map(image => image.urls.thumb)])]
            })
            setHasMore(res.data.total > 0)
            setLoading(false)
            console.log(res.data);
        }).catch(e => {
            if(axios.isCancel(e)) return
        })
        return () => cancel()
    }, [query, pageNumber])
    
    return { loading, error, images, hasMore }
}

export default useSearchImages
