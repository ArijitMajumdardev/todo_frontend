import React,{useState,useContext,useEffect} from 'react'
import { Context,server } from '../main'
import axios from 'axios'
import { Navigate } from "react-router-dom";
import { toast } from 'react-hot-toast';
import Todoitem from '../components/Todoitem'

export default function Home() {

  const [title,setTitle] = useState("")
  const [description,setDescription] = useState("")
  const [loading, setLoading] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [refresh, setRefresh] = useState(false);


  const { isAuthenticated } = useContext(Context);

  const updateHandler = async(id)=>{
    try {
      const {data} = await axios.put(`${server}/tasks/${id}`,{},{
        withCredentials:true,
      })

      toast.success(data.message)
      setRefresh((prev) => !prev);
      
    } catch (error) {
      toast.error(error.response.data.message);

    }

  }
  const deleteHandler =async (id)=>{
    try {
      const { data } = await axios.delete(`${server}/tasks/${id}`, {
        withCredentials: true,
      });

      toast.success(data.message);
      setRefresh((prev) => !prev);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }

 
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await axios.post(
        `${server}/tasks/new`,
        {
          task : title,
          description,
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      setTitle("");
      setDescription("");
      toast.success(data.message);
      setLoading(false);
      setRefresh((prev) => !prev);
    } catch (error) {
      toast.error(error.response.data.message);
      setLoading(false);
    }
  };




  useEffect(() => {
    axios
      .get(`${server}/tasks/my`, {
        withCredentials: true,
      })
      .then((res) => {
        setTasks(res.data.tasks);
      })
      .catch((e) => {
        toast.error(e.response.data.message);
      });
  }, [refresh]);



  if (!isAuthenticated) return <Navigate to={"/login"} />;

  return (
    <div className="container">
       <div className='login'>
    <section>
      <form  onSubmit={submitHandler}>

        <input type="text" value={title} placeholder="Task" onChange={(e)=>{setTitle(e.target.value)}} required />

        <input type="text" value={description} placeholder="Description" onChange={(e)=>{setDescription(e.target.value)}} required />

        <button disabled={loading} type='submit'>Add Task</button>
      </form>
    </section>
  </div>

  <section className='todosContainer'>

    {
      tasks.map((i)=>(
        <Todoitem 
        key={i._id}

         id={i._id}

         title={i.task} 

        description={i.description} 

         isCompleted={i.isCompleted} 

        updateHandler={updateHandler} deleteHandler={deleteHandler} />
      ))
    }

  </section>

    </div>
  )
}
