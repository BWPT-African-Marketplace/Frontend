import React, { useState , useEffect} from 'react'
import axios from 'axios'
import * as Yup from 'yup'


const SignUpSchema = Yup.object().shape({
    username:Yup
        .string()
        .min( 3 , 'First Name Must Be At Least 3 Characters')
        .required('Name Required'),
    business:Yup
        .string(),
    email:Yup
        .string()
        .email('Email Must Be In Correct Format')
        .required('Email Is Required'),
    password: Yup
        .string()
        .required('Password Is Required')
        .min(5 , 'Password must be at least 5 Characters')
})

const newForm = {username:'', business:'', email:'', password:''}
const signupErrors = {username:'', email:'', password:''}
const SignUp = () => {
    const [signUp , setSignUp] = useState(newForm)
    const [formErrors , setFormErrors] = useState(signupErrors)
    const [ disabled , setDisabled] = useState(true)

     // Validate Form
     const validateSignUp = (name ,value) => {
        Yup.reach(SignUpSchema , name)
        .validate(value)
        .then( () => setFormErrors( {...formErrors , [name]: ''} ) )
        .catch( err => setFormErrors( {...formErrors , [name]: err.errors[0]} ) )
    }
    // Change Form Value
    const handleChange = e => {
        const { name , value } = e.target
        setSignUp({ ...signUp , [name]: value })
        validateSignUp( name , value)
    }

    // Enable Button
    useEffect( () => {
        SignUpSchema.isValid(signUp)
        .then(isValid => setDisabled(!isValid))
        .catch( err => console.log(err))
    },[signUp] )



    // Axios POST request
    const register = (signUp) => {
        axios.post('https://african-marketplace-oz.herokuapp.com/api/register', {
            headers:{
                'Access-Control-Allow-Origin': 'http://localhost:3000'
            },
            body: {
                username: signUp.username,
                password: signUp.password
            }
        })
        .then(res => console.log('success', res))
        .catch(err => console.log('error' , err))
    }
    // Submit Form
    const handleSubmit = e => {
        e.preventDefault()
        register(signUp)
        console.log(signUp)
        setSignUp(newForm)
    }
    return(
        <section>
            <form onSubmit={handleSubmit}>
                <div>{formErrors.username}</div>
                <div>{formErrors.email}</div>
                <div>{formErrors.password}</div>
                {/* USERNAME */}
                <label htmlFor='username'>User Name</label>
                <input 
                    name='username'
                    type='text'
                    placeholder='Username'
                    value={signUp.username}
                    onChange={handleChange}
                    />
               
                {/* Business NAME */}
                <label htmlFor='business'>Business Name</label>
                <input 
                    name='business'
                    type='text'
                    placeholder='Business'
                    value={signUp.business}
                    onChange={handleChange}
                    />
                {/* EMAIL */}
                <label htmlFor='email'>Email</label>
                <input 
                    name='email'
                    type='email'
                    placeholder='email@yourbusiness.com'
                    value={signUp.email}
                    onChange={handleChange}
                    />
                {/* PASSWORD */}
                <label htmlFor='password'>Create Password</label>
                <input 
                    name='password'
                    type='password'
                    placeholder='Password'
                    value={signUp.password}
                    onChange={handleChange}
                    />
                <button disabled={disabled}>Sign Up</button>
            </form>
        </section>
    )
}

export default SignUp