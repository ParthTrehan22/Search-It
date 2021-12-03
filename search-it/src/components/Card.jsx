import React from 'react'
import "../styles/Card.css"

function Card(props) {
    return (
        <div className="Card">
            <img src={props.info.urls.raw} alt="image" />
        </div>    
    )
}

export default Card
