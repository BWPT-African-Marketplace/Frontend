import React, { useState , useEffect , useRef} from 'react'
import FormStyle from '../components/FormStyle'
import axios from 'axios'
import * as Yup from 'yup'
import { gsap } from 'gsap'

const SignUpSchema = Yup.object().shape({
    username:Yup
        .string()
        .min( 3 , 'First Name Must Be At Least 3 Characters')
        .required('Name Required'),
    password: Yup
        .string()
        .required('Password Is Required')
        .min(5 , 'Password must be at least 5 Characters')
})

const newForm = {username:'', password:''}
const signupErrors = {username:'',  password:''}

const SignUp = () => {
    const [signUp , setSignUp] = useState(newForm)
    const [formErrors , setFormErrors] = useState(signupErrors)
    const [ disabled , setDisabled] = useState(true)


    // transitions
    const formTL = gsap.timeline();
    const formRef = useRef(null)
    const titleRef = useRef(null)
    const userLabelRef = useRef(null)
    const userInputRef = useRef(null)
    const passwordLabelRef = useRef(null)
    const passwordRef = useRef(null)
    const buttonRef = useRef(null)

    useEffect( () => {
        formTL.from( titleRef.current , { duration: 0.5 , opacity : 0, x:-100, ease: "power2.out"})
        formTL.from( formRef.current , { duration: 0.5 , opacity : 0, x:-100 ,  delay:0.1, ease: "power2.out" })
        formTL.from( userLabelRef.current , { duration: 0.25 , opacity : 0, x:-50, delay:0.1, ease: "power2.out" })
        formTL.from( userInputRef.current , { duration: 0.25 , opacity : 0, x:-50, delay:0.1, ease: "power2.out" })
        formTL.from( passwordLabelRef.current , { duration: 0.25 , opacity : 0, x:-50, delay:0.1, ease: "power2.out" })
        formTL.from( passwordRef.current , { duration: 0.25 , opacity : 0, x:-50, delay:0.1, ease: "power2.out" })
        formTL.from( buttonRef.current , { duration: 0.25 , opacity : 0, x:-50, delay:0.1, ease: "power2.out" })

        },[] )
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

useEffect( () => {
    axios.get('https://african-marketplace-oz.herokuapp.com')
.then(res => console.log(res))
},[] )

    // Axios POST request
    const register = (signUp) => {
        axios.post('https://african-marketplace-oz.herokuapp.com/api/register', signUp
    )
        .then(res => console.log('success', res))
        .catch(err => console.log('error' , err.message))
    }
    // Submit Form
    const handleSubmit = e => {
        e.preventDefault()
        register(signUp)
        console.log(signUp)
        setSignUp(newForm)
    }
    return(
        <FormStyle>
            <h2  ref={titleRef}>SIGN UP</h2>
            <form  ref={formRef} onSubmit={handleSubmit}>
                <div className='err'>{formErrors.username}</div>
                <div className='err'>{formErrors.email}</div>
                <div className='err'>{formErrors.password}</div>
                {/* USERNAME */}
                <label  ref={userLabelRef} htmlFor='username'>Username</label>
                <input
                    ref={userInputRef} 
                    name='username'
                    type='text'
                    placeholder='Username'
                    value={signUp.username}
                    onChange={handleChange}
                    />
               
                {/* PASSWORD */}
                <label  ref={passwordLabelRef} htmlFor='password'>Create Password</label>
                <input
                     ref={passwordRef} 
                    name='password'
                    type='password'
                    placeholder='Password'
                    value={signUp.password}
                    onChange={handleChange}
                    />
                <button  ref={buttonRef} disabled={disabled}>Sign Up</button>
            </form>
        </FormStyle>
    )
}

export default SignUp