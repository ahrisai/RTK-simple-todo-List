import React from 'react'
import { useDispatch } from 'react-redux'
import { toggleTodoComplete,removeTodo } from '../store/todoSlice'
import { deleteTodo } from '../store/todoSlice'
const TodoTask = ({Task}) => {
  const dispatch = useDispatch()
  const toggleTaskComplete=(id,completed)=> dispatch(toggleTodoComplete({id,completed}))
  const removeTask=(id)=>{
    dispatch(deleteTodo(id))}
  return (
    <div>
        <input type="checkbox" checked={Task.completed} onChange={()=>toggleTaskComplete(Task.id,Task.completed)}/>
        <span>{Task.title}</span>
        <button onClick={()=>removeTask(Task.id)} >Удалить</button>
    </div>
  )
}

export default TodoTask