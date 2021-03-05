import React, { useEffect, useState , useRef } from 'react'
import { Link } from 'react-router-dom'
import banner  from '../banner.jpg'
import CreateItem from '../components/CreateItem'
import styled from 'styled-components'
import { gsap } from 'gsap'

const HomePage = styled.section`
    article {
        position:relative;
        background-color:#000;
        height:30rem;
        color: #F3F3F3;
        img {
            width:100%;
            height:30rem;
            opacity:0.5;
            object-fit:cover;
        }
        .main-text {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            font-size:1.2rem;

            h1{
                font-size:1.6rem;
                font-weight: 700;
            }

            p{
                margin-bottom:2rem;
            }
            a{
                text-decoration:none;
                color:#F3F3F3;
                padding: 1rem 2.5rem;
                margin-top: 1rem;
                background-color: #E84C3D;
            }
        }
        figcaption {
            position: absolute;
            bottom: 0.8rem;
            left: 1.6rem;
        }
    }
    h3{
        font-size: 1.5rem;
    }
    .collection{
        display:flex;
        justify-content:space-around;
    }

`


const Home = ({data}) => {
    const homeTL = gsap.timeline();
    const articleRef = useRef(null)
    const titleRef = useRef(null)
    const collectionRef = useRef(null)
    const itemRef = useRef(null)
    const [allItems] = useState(data)

    useEffect( () => {
        homeTL.from( articleRef.current , { duration: 0.5 , opacity : 0, x:-100})
        homeTL.from( titleRef.current , { duration: 0.5 , opacity : 0, x:-100 ,  delay:0.1 })
        homeTL.from( collectionRef.current , { duration: 0.5 , opacity : 0, x:-100, delay:0.2 })
        homeTL.to( itemRef.current , {opacity: 1 , stagger:0.5 })

        },[homeTL] )
    return(
        <HomePage>
            <article ref={articleRef}>
                <img src={banner} alt='Taryn Elliott from Pexels' ></img>
                <figcaption>Photo by Taryn Elliott from Pexels</figcaption>
                <section className='main-text'>
                    <h1> Empowering East Africa's women-led SMEs to trade legally, safely and profitably across borders</h1>
                    <p>Compare market prices for items sold in: <br></br> Kenya , Uganda , Tanzania , & Rwanda</p>
                    <p>Create your own profile and post new items for sale</p>
                    <Link to='/signup'>Get Started!</Link>
                </section>
            </article>
            <h3 ref={titleRef}>Current Items Available</h3>
            <div ref={collectionRef} className='collection'>
                { allItems.map( item => <CreateItem ref={itemRef} item = {item} /> )}
            </div>
        </HomePage>
    )
}

export default Home;