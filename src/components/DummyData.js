import { v4 as uuidv4 } from 'uuid';
const Data = [
    {
        id: uuidv4(),
        location:'Kenya',
        itemName: 'Goat Meat' ,
        price: '3.5',
        value: 'KES',
        description: 'Fresh cut goat meat. Born from local pastures. sold by the kilogram.'
        
    },
    {
        id: uuidv4(),
        location:'Rwanda',
        itemName: 'Maize Flour' ,
        price: '1',
        value: 'RWF',
        description: '35grams of flour for all purposes.'
        
    },
    {
        id: uuidv4(),
        location:'Tanzania',
        itemName: 'Passion Friuts' ,
        price: '2.5',
        value: 'TZS',
        description: 'A bundle of passion fruit'
        
    },
    {
        id: uuidv4(),
        location:'Uganda',
        itemName: 'Red Irish Potatoes' ,
        price: '5',
        value: 'UGX',
        description: 'Large sack of potatoes.'
        
    },
]
 export default Data