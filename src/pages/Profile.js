import axios from 'axios'
import React, { useState , useEffect} from 'react'
import * as Yup from 'yup'

import Reference from '../components/MarketReference'
import CreateItem from '../components/CreateItem'
import styled from 'styled-components'
import { v4 as uuidv4 } from 'uuid';

const ProfileStyle = styled.section`
    display:flex;
    flex-flow:column nowrap;
    form {
        display:flex;
        flex-direction:column;
        width:35%;
        margin:3rem auto;
        font-size:1.2rem;
        text-align:left;
        select , input{
            height:2rem;
            margin:0.5rem 0;
        }
        .price{
            height:1rem;
            width:2rem;
            margin: 0 0.5rem;
        }
        button{
            width: 30%;
            height: 2rem;
        }
    }
    h2{
        background-color:#2A2A2A;
        color:#f3f3f3;
        width:100%;
        font-size:1.8rem;
        padding: 0.5rem 0;
        text-align:center;
    }
    .collection{
        display:flex;
        justify-content:space-around;
        margin:1.5rem auto;
    }
`


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
    .number('Must be a number')
    .required('Price Is Required'),
    value:Yup
    .string()
    .oneOf(['KES','UGX','TZS', 'RWF' ,'BITCOIN'] , 'Currency Is Required')
    .required()
})
const newItem = {id: uuidv4(), location:'', itemName:'', description:'', price:'', value:''}
const itemErrors = {location:'', itemName:'', description:'', price:'', value:''}



const Profile = ({data}) => {
    const [listing , setListing] = useState(newItem)
    const [formErrors , setFormErrors] = useState(itemErrors)
    const [shopItems , setShopItems] = useState(data)
    const [ disabled , setDisabled] = useState(true)
    console.log(shopItems)
    const validateItem = (name ,value) => {
        Yup.reach(ItemSchema , name)
        .validate(value)
        .then( () => setFormErrors( {...formErrors , [name]: ''} ) )
        .catch( err => setFormErrors( {...formErrors , [name]: err.errors[0]} ) )
    }

    const handleChange = e => {
        e.preventDefault()
        const { name , value } = e.target
        setListing({ ...listing , [name]: value })
       validateItem(name , value)
    }

    // Enable Button
    useEffect( () => {
        ItemSchema.isValid(listing)
        .then(isValid => setDisabled(!isValid))
        .catch( err => console.log(err))
    },[listing] )

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
        <ProfileStyle>
            <form onSubmit={handleSubmit}>
            <h2>Create A New Listing</h2>
                <div>{formErrors.location}</div>
                <div>{formErrors.itemName}</div>
                <div>{formErrors.price}</div>
                <div>{formErrors.value}</div>
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
                    name='value'
                    value={listing.value}
                    onChange={handleChange}
                    >
                    <option value=''>--Select Currency--</option>
                    <option value='KES'>Kenyan Shilling</option>
                    <option value='UGX'>Ugandan Shilling</option>
                    <option value='TZS'>Tanzanian Shilling</option>
                    <option value='RWF'>Rwandan Franc</option>
                    <option value='BITCOIN'>BitCoin</option>
                </select>
                </label>
                <button disabled = {disabled}>Add Item</button>
            </form>
            <h2>Current Market Prices</h2>
            <Reference key = {uuidv4()}/>
            <div className='collection'>
            {shopItems.map( item => <CreateItem item = {item} /> )}
        </div>
        </ProfileStyle>
        

    )
}

export default Profile