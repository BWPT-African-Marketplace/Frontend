import axios from 'axios'
import React, { useState } from 'react'

const newItem = {id:Math.random() * 1000, item:'', description:'', price:'', money:''}
const Profile = () => {
    const [listing , setListing] = useState(newItem)
    const [shopItems , setShopItems] = useState([])
    const handleChange = e => {
        const { name , value } = e.target
        setListing({ ...listing , [name]: value })
       
    }
    const postNewListing = item => {
        axios.post("https://reqres.in/api/order", item)
        .then( res => {
            setShopItems([...shopItems , res.data])
            setListing(newItem)
        })
        .catch(err => console.log(err))
    }
    const handleSubmit = e => {
        e.preventDefault()
        console.log(listing)
        postNewListing(listing)
        
    }
    return (

        <section>
            <h2>Welcome Back!</h2>
            <h5>Create A New Listing</h5>
            <form onSubmit={handleSubmit}>
                <label htmlFor='item'>Item</label>
                <input
                    name='item'
                    type='text'
                    value={listing.item}
                    onChange={handleChange}
                />
                <label htmlFor='description'>Description</label>
                <textarea
                    name='description'
                    type='text'
                    value={listing.description}
                    onChange={handleChange}
                />
                <label htmlFor='price'>Price
                <input
                    name='price'
                    type='text'
                    value={listing.price}
                    onChange={handleChange}
                    className='price'
                />
                <select
                    name='money'
                    value={listing.money}
                    onChange={handleChange}
                    >
                    <option value=''>--Select Currency--</option>
                    <option value='SHILLING'>Shilling</option>
                    <option value='FRANC'>Franc</option>
                    <option value='USD'>USD</option>
                    <option value='BITCOIN'>BitCoin</option>
                </select>
                </label>
                <button>Add Item</button>
            </form>
            {shopItems.map( item => {
                return (
                    <div key = {item.id}>
                    <p>{item.item}</p>
                    <p>{item.price}</p>
                    <span>{item.money}</span>
                    <p>{item.description}</p>
                </div>
                )
            } )}
        
        </section>
    )
}

export default Profile