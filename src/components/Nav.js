import React from 'react'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'


const Header = styled.header`
    display:flex;
    background-color:#E84C3D;
    justify-content:space-between;
    align-items:center;
    padding: 1rem 5%;
    color: #F3F3F3;
    h1{
        font-size:1.5rem;
    }
    nav{
        display:flex;
        justify-content:space-between;
    }
    a {
        text-decoration:none;
        color: #F3F3F3;
        margin: 0.2rem 0.25rem;
        padding-right: 0.5rem;
        border-right: 0.1rem solid #F3F3F3;
        font-size:1.2rem;
    }
    .lastLink {
        border:none;
    }
`
const Nav = () => {

    return(
        <Header>
            <h1>African MarketPlace</h1>
            <nav>
                <NavLink to='/' >Home</NavLink>
                <NavLink to='/signup'>Sign Up</NavLink>
                <NavLink className='lastLink' to='/login'>Log In</NavLink>
            </nav>
        </Header>
    )
}

export default Nav