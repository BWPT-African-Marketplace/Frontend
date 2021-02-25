import React from 'react'
import { NavLink } from 'react-router-dom'
const Nav = () => {

    return(
        <header>
            <h1>African MarketPlace</h1>
            <nav>
                <NavLink to='/'>Home</NavLink>
                <NavLink to='/signup'>Sign Up</NavLink>
                <NavLink to='/login'>Log In</NavLink>
            </nav>
        </header>
    )
}

export default Nav