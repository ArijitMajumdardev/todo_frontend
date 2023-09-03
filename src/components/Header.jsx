import React,{useContext,useState} from 'react'
import { Context,server } from '../main'
import { Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import "../styles/header.scss"


export default function Header() {

  const {isAuthenticated,setIsAuthenticated , loading , setLoading } = useContext(Context);

  const logoutHandler = async ()=>{
   try {
    
    await axios.get(`${server}/user/logout`,{
      withCredentials:true
    })

    toast.success("Logged Out Successfully");
    setIsAuthenticated(false);
    setLoading(false);

   } catch (error) {
     toast.error(error.response.data.message);
      setIsAuthenticated(true);
      setLoading(false);
   }
  }



  return (
    <nav className='header'>
      <div>
        <h2>Todo</h2>
      </div>

      <article>
        <Link to={'/'}>Home</Link>
        <Link to={'/profile'}>Profile</Link>

        {
          isAuthenticated?
         ( <button disabled={loading} onClick={logoutHandler} className="btn">Logout</button>)
          :
          (<Link to={'/login'}>Login</Link>)
        }

      </article>
    </nav>
  )
}
