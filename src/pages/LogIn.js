import React , {useState , useEffect} from 'react'
import {axiosWithAuth} from '../utils/axiosWithAuth'
import FormStyle from '../components/FormStyle'
import * as Yup from 'yup'
import { useHistory } from 'react-router-dom'


const LoginSchema = Yup.object().shape({
    username:Yup  
        .string()
        .required('Username is Required'),
    password:Yup
        .string()
        .required('Password is Required')
})

const newForm = { username:'', password:'' }
const loginErrors = { username:'', password:'' }
const LogIn = () => {
    const [login , setLogIn] = useState(newForm)
    const [formErrors , setFormErrors] = useState(loginErrors)
    const [ disabled , setDisabled] = useState(true)

    // Validate Form
    const validateLogin = (name ,value) => {
        Yup.reach(LoginSchema , name)
        .validate(value)
        .then( () => setFormErrors( {...formErrors , [name]: ''} ) )
        .catch( err => setFormErrors( {...formErrors , [name]: err.errors[0]} ) )
    }
    // Change Form Value
    const handleChange = e => {
        const { name , value } = e.target
        setLogIn({ ...login , [name]: value })
        validateLogin( name , value)
    }

    // Enable Button
    useEffect( () => {
        LoginSchema.isValid(login)
        .then(isValid => setDisabled(!isValid))
        .catch( err => console.log(err))
    },[login] )

    const history = useHistory();
    // Axios POST request
    const loginUser = (login) => {
        axiosWithAuth().post('https://african-marketplace-oz.herokuapp.com/api/login', login)
        .then(res => {
            console.log('success', res)
            localStorage.setItem('token' , res.data.token)
            localStorage.setItem('token' , res.data.user_id)
            history.push(`/profile/${res.data.user_id}`)
        })
        .catch(err => console.log('error' , err))
    }
    // Submit Form
    const handleSubmit = e => {
        e.preventDefault()
        loginUser(login)
        console.log(login)
        setLogIn(newForm)
    }
    return(
        <FormStyle>
            <h2>LOG IN</h2>
        <form onSubmit={handleSubmit}>
            {/* FORM ERRORS */}
            <div>{formErrors.username}</div>
            <div>{formErrors.password}</div>
            {/* USERNAME */}
             <label htmlFor='username'>Username</label>
                <input 
                    name='username'
                    type='text'
                    value={login.username}
                    onChange={handleChange}
                    />
                {/* PASSWORD */}
                <label htmlFor='password'>Password</label>
                <input 
                    name='password'
                    type='password'
                    value={login.password}
                    onChange={handleChange}
                    />
                <button disabled={disabled}>Log In</button>

        </form>
        </FormStyle>
    )
}

export default LogIn