import axios from 'axios'
import React, { useState , useEffect, useRef} from 'react'
import * as Yup from 'yup'
import { gsap } from 'gsap'
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

    const profileTL = gsap.timeline()
    const formRef = useRef(null)
    const titleRef = useRef(null)
    const locationLabelRef = useRef(null)
    const locationRef = useRef(null)
    const itemLabelRef = useRef(null)
    const itemRef = useRef(null)
    const desLabelRef = useRef(null)
    const desRef = useRef(null)
    const priceRef = useRef(null)
    const buttonRef = useRef(null)
    const marketRef = useRef(null)
    const marketPriceRef = useRef(null)
    const collectionRef = useRef(null)

    useEffect( () => {
       profileTL.from( titleRef.current , { duration: 0.5 , opacity : 0, x:-100, ease:"power2.out"})
       profileTL.from( formRef.current , { duration: 0.5 , opacity : 0, x:-100 ,  delay:0.1, ease:"power2.out" })
       profileTL.from( locationLabelRef.current , { duration: 0.125 , opacity : 0, x:-50, delay:0.1, ease:"power2.out"})
       profileTL.from( locationRef.current , { duration: 0.125 , opacity : 0, x:-50, delay:0.1, ease:"power2.out" })
       profileTL.from( itemLabelRef.current , { duration: 0.125 , opacity : 0, x:-50, delay:0.1, ease:"power2.out" })
       profileTL.from( itemRef.current , { duration: 0.125 , opacity : 0, x:-50, delay:0.1, ease:"power2.out" })
       profileTL.from( desLabelRef.current , { duration: 0.125 , opacity : 0, x:-50, delay:0.1, ease:"power2.out" })
       profileTL.from( desRef.current , { duration: 0.125 , opacity : 0, x:-50, delay:0.1, ease:"power2.out" })
       profileTL.from( priceRef.current , { duration: 0.125 , opacity : 0, x:-50, delay:0.1, ease:"power2.out" })
       profileTL.from( buttonRef.current , { duration: 0.125 , opacity : 0, x:-50, delay:0.1, ease:"power2.out" })
       profileTL.from( marketRef.current , { duration: 0.5 , opacity : 0, x:-50, delay:0.1, ease: "power2.out" })
       profileTL.from( marketPriceRef.current , { duration: 0.5 , opacity : 0, x:-50, delay:0.2, ease: "power2.out" })
       profileTL.from( collectionRef.current , { duration: 0.5 , opacity : 0, x:-50, delay:0.2, ease: "power2.out"})

        },[] )

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
            <form ref={formRef} onSubmit={handleSubmit}>
            <h2 ref={titleRef}>Create A New Listing</h2>
                <div>{formErrors.location}</div>
                <div>{formErrors.itemName}</div>
                <div>{formErrors.price}</div>
                <div>{formErrors.value}</div>
                <label ref={locationLabelRef} htmlFor='location'>Location</label>
                <select
                    ref={locationRef}
                    name='location'
                    value={listing.location}
                    onChange={handleChange}>
                    <option value=''>--Select Location--</option>
                    <option value='Kenya'>Kenya</option>
                    <option value='Rwanda'>Rwanda</option>
                    <option value='Tanzania'>Tanzania</option>
                    <option value='Uganda'>Uganda</option>
                </select>
                <label ref={itemLabelRef} htmlFor='itemName'>Item</label>
                <input
                    ref={itemRef}
                    name='itemName'
                    type='text'
                    value={listing.item}
                    onChange={handleChange}
                />
                <label ref={desLabelRef} htmlFor='description'>Description</label>
                <textarea
                    ref={desRef}
                    name='description'
                    type='text'
                    value={listing.description}
                    onChange={handleChange}
                />
                <label ref={priceRef} htmlFor='price'>
                    Price
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
                <button ref={buttonRef} disabled = {disabled}>Add Item</button>
            </form>
            <h2 ref={marketRef}>Current Market Prices</h2>
            <div ref={marketPriceRef}><Reference key = {uuidv4()}/></div>
            <div ref={collectionRef} className='collection'>
                {shopItems.map( item => <CreateItem item = {item} /> )}
            </div>
        </ProfileStyle>
        

    )
}

export default Profile