import React from 'react'

const CreateItem = ({item}) => {
    return (
        <div key = {item.id}>
        <p>Location: {item.location}</p>
        <p>Item: {item.itemName}</p>
        <p>Price: {item.price}  <span>{item.value}</span></p>
        <p>{item.description}</p>
    </div>
    )
}

export default CreateItem