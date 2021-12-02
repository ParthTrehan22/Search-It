import React from 'react'
import Card from './Card';

function Cards(props) {
    return (
        <div className="Cards-container">
            {props.data.results.map(image => <Card info={image}></Card>)}
        </div>
    )
}

export default Cards
