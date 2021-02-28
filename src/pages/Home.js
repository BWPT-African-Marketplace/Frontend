import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import CreateItem from '../components/CreateItem'
const Home = ({data}) => {
    const [allItems] = useState(data)
    return(
        <section>
            <article>
                <h1> Empowering East Africa's women-led SMEs to trade legally, safely and profitably across borders</h1>
                <p>Compare market prices for items sold in Kenya , Uganda , Tanzania , & Rwanda</p>
                <p>Create your own profile and post new items for sale</p>
                <Link to='/signup'>Get Started!</Link>
            </article>
            <h3>Current Items Available</h3>
       { allItems.map( item => <CreateItem item = {item} /> )}
        </section>
    )
}

export default Home