import axios from 'axios'
import React, { useState } from 'react'
import * as Yup from 'yup'
import Reference from '../components/MarketReference'
const ItemSchema = Yup.object().shape({
    location:Yup
    .string()
    .oneOf(['Kenya' , 'Rwanda' , 'Tanzania' , 'Uganda'] , 'Location Is Required')
    .required(),
    itemName:Yup
    .string()
    .required(),
    description:Yup
    .string(),
    price:Yup
    .string()
    .required('Price Is Required'),
    money:Yup
    .string()
    .oneOf(['SHILLING','FRANC','USD','BITCOIN'] , 'Currency Is Required')
})
const newItem = {id:Math.random() * 1000, location:'', itemName:'', description:'', price:'', money:''}
const itemErrors = {location:'', itemName:'', description:'', price:'', money:''}



const Profile = () => {
    const [listing , setListing] = useState(newItem)
    const [formErrors , setFormErrors] = useState(itemErrors)
    const [shopItems , setShopItems] = useState([])

    const validateItem = (name ,value) => {
        Yup.reach(ItemSchema , name)
        .validate(value)
        .then( () => setFormErrors( {...formErrors , [name]: ''} ) )
        .catch( err => setFormErrors( {...formErrors , [name]: err.errors[0]} ) )
    }

    const handleChange = e => {
        const { name , value } = e.target
        setListing({ ...listing , [name]: value })
       validateItem(name , value)
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
            <Reference/>
            <h5>Create A New Listing</h5>
            <form onSubmit={handleSubmit}>
                <div>{formErrors.location}</div>
                <div>{formErrors.itemName}</div>
                <div>{formErrors.price}</div>
                <div>{formErrors.money}</div>
                <label htmlFor='location'>Location</label>
                <select
                    name='location'
                    value={listing.location}
                    onChange={handleChange}>
                    <option value=''>--Select Location--</option>
                    <option value='Kenya'>Kenya</option>
                    <option value='Rwanda'>Rwanda</option>
                    <option value='Tanzania'>Tanzania</option>
                    <option value='Uganda'>Uganda</option>
                </select>
                <label htmlFor='itemName'>Item</label>
                <input
                    name='itemName'
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
                    <p>Location: {item.location}</p>
                    <p>Item: {item.itemName}</p>
                    <p>Price: {item.price}  <span>{item.money}</span></p>
                    <p>{item.description}</p>
                </div>
                )
            } )}
        
        </section>
    )
}

export default Profile