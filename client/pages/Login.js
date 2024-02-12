import { useState } from 'react'
import { useLogin } from '../hooks/useLogin'

const Login =()=>{
    const [email, setEmail]= useState('')
    const [password,setPassword]=useState('')
    const {login,  isLoading,  error}= useLogin()

    const handleSubmit= async (e)=>{
        e.preventDefault();
        await login(email,password)
        console.log('Submit button clicked');

    }
    return (
        <form className='Login-form' 
        onSubmit={handleSubmit}>
        <h3>log in</h3>
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
            <button disabled={isLoading}>Log in</button>
            {error && <div className='error'>{error}</div>}

        </form>
    )
}

export default Login