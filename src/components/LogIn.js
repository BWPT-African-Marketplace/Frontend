import React , {useState , useEffect} from 'react'
import * as Yup from 'yup'


const LoginSchema = Yup.object().shape({
    email:Yup  
        .string()
        .email()
        .required('Email is Required'),
    password:Yup
        .string()
        .required('Password is Required')
})

const newForm = { email:'', password:'' }
const loginErrors = { email:'', password:'' }
const LogIn = () => {
    const [login , setLogIn] = useState(newForm)
    const [formErrors , setFormErrors] = useState(loginErrors)
    const [ disabled , setDisabled] = useState(true)

    // Validate Form
    const ValidateLogin = (name ,value) => {
        Yup.reach(LoginSchema , name)
        .validate(value)
        .then( () => setFormErrors( {...formErrors , [name]: ''} ) )
        .catch( err => setFormErrors( {...formErrors , [name]: err.errors[0]} ) )
    }
    // Change Form Value
    const handleChange = e => {
        const { name , value } = e.target
        setLogIn({ ...login , [name]: value })
        ValidateLogin( name , value)
    }

    // Enable Button
    useEffect( () => {
        LoginSchema.isValid(login)
        .then(isValid => setDisabled(!isValid))
        .catch( err => console.log(err))
    },[login] )

    // Axios POST request

    // Submit Form
    const handleSubmit = e => {
        e.preventDefault()
        console.log(login)
        setLogIn(newForm)
    }
    return(
        <form onSubmit={handleSubmit}>
            {/* FORM ERRORS */}
            <div>{formErrors.email}</div>
            <div>{formErrors.password}</div>
            {/* EMAIL */}
             <label htmlFor='email'>Email</label>
                <input 
                    name='email'
                    type='email'
                    placeholder='email@yourbusiness.com'
                    value={login.email}
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