import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login"
import Profile from "./pages/Profile"
import { Toaster } from "react-hot-toast";
import { useContext, useEffect } from "react";
import axios from "axios";
import { Context, server } from "./main";

function App() {
  const { setUser, setIsAuthenticated, setLoading } = useContext(Context);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${server}/user/me`, {
        withCredentials: true,
      })
      .then((res) => {
        setUser(res.data.user);
        setIsAuthenticated(true);
        setLoading(false);
        console.log(res.data.user)
      })
      .catch((error) => {
        setUser({});
        setIsAuthenticated(false);
        setLoading(false);
      });
  }, []);
  
  return (
   <Router>
    <Header />
    <Routes>
      <Route path="/"  element={<Home/>}/>
      <Route path="/register"  element={<Register/>}/>
      <Route path="/login"  element={<Login/>}/>
      <Route path="/profile"  element={<Profile/>}/>
    </Routes>
   <Toaster/>
   </Router>
 
  )
}

export default App
