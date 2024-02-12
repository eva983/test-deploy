import { useState } from 'react'
import { useSignup } from '../hooks/useSignup'
const Signup =()=>{
    const [email, setEmail]= useState('')
    const [password,setPassword]=useState('')
    const {signup, isLoading,  error} =useSignup()

    const handleSubmit= async (e)=>{

        e.preventDefault();

        await signup(email,password)
        console.log('Submit button clicked');

    }
    return (
        <form className='signup-form' 
        onSubmit={handleSubmit}>
        <h3>sign up</h3>
        <label>Email:</label>
            <input type='text' placeholder='email@provider.com'
            onChange={(e)=>setEmail(e.target.value)}
            
            value={email}
            />
              <label>Password:</label>
            <input type='password' 
            placeholder='********'
            onChange={(e)=>setPassword(e.target.value)}
            
            value={password}
            />
            <button disabled={isLoading}>Sign up</button>
            {error && <div className='error'>{error}</div>}

        </form>
    )
}

export default Signup