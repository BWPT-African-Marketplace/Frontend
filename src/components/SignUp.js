import React from 'react'

const SignUp = () => {
    return(
        <section>
            <form>
                {/* NAME */}
                <label htmlFor='fname'>First Name</label>
                <input 
                    name='fname'
                    type='text'
                    placeholder='First'
                    />
                <label htmlFor='lname'>Last Name</label>
                <input 
                    name='lname'
                    type='text'
                    placeholder='Last'
                    />
                {/* Business NAME */}
                <label htmlFor='business'>Business Name</label>
                <input 
                    name='business'
                    type='text'
                    placeholder='Business'
                    />
                {/* EMAIL */}
                <label htmlFor='email'>Email</label>
                <input 
                    name='email'
                    type='email'
                    placeholder='email@yourbusiness.com'
                    />
                {/* PASSWORD */}
                <label htmlFor='password'>Create Password</label>
                <input 
                    name='password'
                    type='password'
                    />
                <button>Sign Up</button>
            </form>
        </section>
    )
}

export default SignUp