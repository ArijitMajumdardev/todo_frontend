import React from 'react'
import "../styles/todoitem.scss"

function Todoitem( {title,
    description,
    isCompleted,
    updateHandler,
    deleteHandler,
    id}) {
  return (
<div className='todos'>
        <div className='task'>
            <h4>{title}</h4>
            <p>{description}</p>
        </div>
        <div className='update'>
        <input
          onChange={() => updateHandler(id)}
          type="checkbox"
          checked={isCompleted}
          
        />
        <button  onClick={() => deleteHandler(id)}  className="btn">
          Delete
        </button>
            
        </div>
    </div>
  )
}

export default Todoitem

