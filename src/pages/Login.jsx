import React, { useContext,useState } from 'react'
import { Context,server } from '../main'
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { Link,Navigate } from 'react-router-dom';
import "../styles/login.scss"

export default function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { isAuthenticated, setIsAuthenticated, loading, setLoading,} = useContext(Context);

   const submitHandler = async (e)=>{
    setLoading(true)
    e.preventDefault();
   
    try {
      
      const {data} = await axios.post(`${server}/user/login`,{
        email,password
   },{
    headers:{
        "Content-Type":"application/json",
    },
    withCredentials:true,
   })

   toast.success(data.message)
   setIsAuthenticated(true);
   setLoading(false);
    } catch (error) {
      
      toast.error(error.response.data.message)
      setIsAuthenticated(false);
      setLoading(false);
    }

   }

   if(isAuthenticated) return <Navigate to={"/"} />


  return (
    <div className='login'>
    <section>
      <form  onSubmit={submitHandler}>

        <input type="email" value={email} placeholder='Email' onChange={(e)=>{setEmail(e.target.value)}} required />

        <input type="password" value={password} placeholder='Password' onChange={(e)=>{setPassword(e.target.value)}} required />

        <button disabled={loading} type='submit'>Login</button>
        <h4>or</h4>

        <Link to="/register">Sign Up</Link>
      </form>
    </section>
  </div>
  )
}
