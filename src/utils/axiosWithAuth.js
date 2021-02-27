import axios from 'axios'

const axiosWithAuth = () => {
    const token = localStorage.getItem('token')

    return axios.create({
        baseURL:"https://african-marketplace-oz.herokuapp.com",
        headers:{
            authorization: 'Bearer' + token
        } 
    })
}

export default axiosWithAuth