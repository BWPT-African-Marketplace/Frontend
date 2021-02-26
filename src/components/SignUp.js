import React, { useState , useEffect} from 'react'
import * as Yup from 'yup'


const SignUpSchema = Yup.object().shape({
    fname:Yup
        .string()
        .min( 3 , 'First Name Must Be At Least 3 Characters')
        .required('Name Required'),
    lname:Yup
    .string()
    .min( 3 , 'Last Name Must Be At Least 3 Characters')
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
})

const newForm = {fname:'', lname:'', business:'', email:'', password:''}
const signupErrors = {fname:'', lname:'', email:'', password:''}
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

    // Submit Form
    const handleSubmit = e => {
        e.preventDefault()
        console.log(signUp)
        setSignUp(newForm)
    }
    return(
        <section>
            <form onSubmit={handleSubmit}>
                {/* NAME */}
                <label htmlFor='fname'>First Name</label>
                <input 
                    name='fname'
                    type='text'
                    placeholder='First'
                    value={signUp.fname}
                    onChange={handleChange}
                    />
                <label htmlFor='lname'>Last Name</label>
                <input 
                    name='lname'
                    type='text'
                    placeholder='Last'
                    value={signUp.lname}
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