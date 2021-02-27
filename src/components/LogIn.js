import React , {useState , useEffect} from 'react'
import axios from 'axios'
import * as Yup from 'yup'


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

    // Axios POST request
    const loginUser = (login) => {
        axios.post('https://african-marketplace-oz.herokuapp.com/api/login', login)
        .then(res => console.log('success', res))
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
        <form onSubmit={handleSubmit}>
            {/* FORM ERRORS */}
            <div>{formErrors.username}</div>
            <div>{formErrors.password}</div>
            {/* EMAIL */}
             <label htmlFor='username'>Usernamel</label>
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
    )
}

export default LogIn