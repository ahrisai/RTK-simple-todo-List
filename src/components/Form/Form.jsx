import React from 'react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addNewToDo } from '../../store/todoSlice'
const Form = () => {
    const [title, setTitle] = useState('')

const dispatch = useDispatch()

const addTask=()=>{
  dispatch(addNewToDo(title))
  setTitle('')
}
  return (
    
    <label >
      <input type="text" value={title} onChange={(e)=>{setTitle(e.target.value)}} />
      <button onClick={addTask}>добавить задачу</button>
     </label>
  )
}

export default Form