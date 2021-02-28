import axios from 'axios'

export const axiosWithAuth = () => {
    const token = localStorage.getItem('token')

    return axios.create({
        baseURL:"https://african-marketplace-oz.herokuapp.com",
        headers:{
            authorization: 'Bearer' + token
        } 
    })
}

