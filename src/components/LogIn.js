import React , {useState} from 'react'


const newForm = { email:'', password: '' }
const LogIn = () => {
    const [login , setLogIn] = useState(newForm)
    // Change Form Value
    const handleChange = e => {
        setLogIn({ [e.target.name]: e.target.value })
    }
    // Submit Form
    const handleSubmit = e => [
        e.preventDefault()
    ]
    return(
        <form onSubmit={handleSubmit}>
            {/* EMAIL */}
             <label htmlFor='email'>Email</label>
                <input 
                    name='email'
                    type='email'
                    placeholder='email@yourbusiness.com'
                    onChange={handleChange}
                    />
                {/* PASSWORD */}
                <label htmlFor='password'>Password</label>
                <input 
                    name='password'
                    type='password'
                    onChange={handleChange}
                    />
                <button>Log In</button>

        </form>
    )
}

export default LogIn