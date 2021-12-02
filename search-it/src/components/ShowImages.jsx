import React from 'react'
import { useQuery } from 'react-query' 
import Cards from './Cards';
import Loading from './Loading';

const fetchImages = search => async () => {
    const data = await fetch(`https://api.unsplash.com/search/photos?query=${search}&client_id=MZg0kz21lnxkcsvvhr-zOIC_5zJq3RDw59NB0FXrdSc`)
    return data.json();
}

function ShowImages(props) {
    const {data, status} = useQuery("images", fetchImages(props.search));
    return (
        <div>
            {status === "loading" && (
                <Loading></Loading>
            )}
            {status === "error" && (
                <div>Error loading data ...</div>
            )}
            {status === "success" && (
                <Cards data = {data}></Cards>
            )}
        </div>
    )
}

export default ShowImages
