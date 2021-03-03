import React from 'react'
import styled from 'styled-components'

const NewItem = styled.div`
display:flex;
flex-direction:column;
align-items:center;    
font-size:1.2rem;
width:20%;
margin: 1rem auto;
padding:0; 
    .name {
        background-color: #E84C3D;
        width:100%;
        padding: 1rem 0.2rem;
        margin:0;
        color: #f3f3f3;
        font-weight:700;
    }
    p{ 
        line-height:1;
    }
`
const CreateItem = ({item}) => {
    return (
    <NewItem key = {item.id}>
        <p className='name'>{item.itemName} | <span>{item.price}</span> <span>{item.value}</span></p>
        <p>Location: {item.location}</p>
        <p>{item.description}</p>
    </NewItem>
    )
}

export default CreateItem