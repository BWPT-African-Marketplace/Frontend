import React, { useState } from 'react'
import styled from 'styled-components'

const Products = styled.section`
    display:flex;
    flex-flow: row wrap;
    justify-content:space-evenly;
    align-items:baseline;
    li {
        list-style:none;
    }
`

const animalList = ['Eggs' , 'Milk' , 'Processed Honey' , 'Tilapia', 'Beef', 'Goat Meat', 'Pork', 'Chicken']
const beanList = ['Candian Beans', 'Mwitemania Beans', 'Rosecoco Beans', 'Black Beans', 'Dolichos', 'Green Gram', 'Kidney Beans' , 'Mixed Beans']
const cerealList = ['Maize', 'Maize Flour', 'Pearl Millet' , 'Barley', 'Red Sorghum', 'Wheat' , 'Rice' , 'Morogoro Rice']
const fruitList = ['Avocado' , 'Apple Bananas', 'Cavendish' , 'Passion Fruits', 'Lemons', 'Limes', 'Pineapples', 'Mangoes']
const vegetableList = ['Brinjals' , 'Cabbages', 'Carrots' , 'Ginger' ,'Kale' , 'Lettuce', 'Onions', 'Tomatoes']
const rootsList = ['Cassava Chips', 'Cassava Flour', 'Cassava Fresh', 'Sun Dried Cassava', 'Red Irish Potatoes','Round Potatoes','Sweet Potatoes', 'White Irish Potatoes']

const Reference = () => {
    const [animalProducts] = useState(animalList)
    const [beanProducts] = useState(beanList)
    const [cerealProducts] = useState(cerealList)
    const [fruitProducts] = useState(fruitList)
    const [vegetableProducts] = useState(vegetableList)
    const [rootProducts] = useState(rootsList)
    const [allProducts] = useState([ animalProducts , beanProducts , cerealProducts, fruitProducts , vegetableProducts , rootProducts ])
    
    return(
       <Products>

           {allProducts.map(( list , index) => {
               let title = index
               switch(title){
                case 0: title = 'Animal ';
                break;
                case 1: title = 'Bean';
                break;
                case 2: title = 'Cereal';
                break;
                case 3: title = 'Fruit';
                break;
                case 4: title = 'Vegetable';
                break;
                case 5: title = 'Root & Tuber';
                break;
                default: title = 'Other Market'
               
            }
               return(
                <article key = {Math.random() * 100}>
                    <h3>{title} Products</h3>
                    <ul>
                        {list.map( product => {
                        return  ( <li> {product} | {Math.floor(Math.random() * 10) + 1}.00 </li>)
                        } )}
                    </ul>
                </article>
               )
           } )}

       </Products>
    )
}

export default Reference