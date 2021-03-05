import React , {useState , useEffect , useRef} from 'react'
import {axiosWithAuth} from '../utils/axiosWithAuth'
import FormStyle from '../components/FormStyle'
import * as Yup from 'yup'
import { useHistory } from 'react-router-dom'
import { gsap } from 'gsap'

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

    const formTL = gsap.timeline();
    const formRef = useRef(null)
    const titleRef = useRef(null)
    const userLabelRef = useRef(null)
    const userInputRef = useRef(null)
    const passwordLabelRef = useRef(null)
    const passwordRef = useRef(null)
    const buttonRef = useRef(null)
    
    useEffect( () => {
        formTL.from( titleRef.current , { duration: 0.5 , opacity : 0, x:-100, ease:"power2.out"})
        formTL.from( formRef.current , { duration: 0.5 , opacity : 0, x:-100 ,  delay:0.1, ease:"power2.out" })
        formTL.from( userLabelRef.current , { duration: 0.25 , opacity : 0, x:-50, delay:0.1, ease:"power2.out" })
        formTL.from( userInputRef.current , { duration: 0.25 , opacity : 0, x:-50, delay:0.1, ease:"power2.out" })
        formTL.from( passwordLabelRef.current , { duration: 0.25 , opacity : 0, x:-50, delay:0.1, ease:"power2.out" })
        formTL.from( passwordRef.current , { duration: 0.25 , opacity : 0, x:-50, delay:0.1, ease:"power2.out" })
        formTL.from( buttonRef.current , { duration: 0.25 , opacity : 0, x:-50, delay:0.1, ease:"power2.out" })

        },[formTL] )

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
        <FormStyle >
            <h2 ref={titleRef}>LOG IN</h2>
        <form ref={formRef} onSubmit={handleSubmit}>
            {/* FORM ERRORS */}
            <div>{formErrors.username}</div>
            <div>{formErrors.password}</div>
            {/* USERNAME */}
             <label ref={userLabelRef} htmlFor='username'>Username</label>
                <input 
                    ref={userInputRef}
                    name='username'
                    type='text'
                    value={login.username}
                    onChange={handleChange}
                    />
                {/* PASSWORD */}
                <label ref={passwordLabelRef} htmlFor='password'>Password</label>
                <input 
                    ref={passwordRef}
                    name='password'
                    type='password'
                    value={login.password}
                    onChange={handleChange}
                    />
                <button ref={buttonRef} disabled={disabled}>Log In</button>

        </form>
        </FormStyle>
    )
}

export default LogIn