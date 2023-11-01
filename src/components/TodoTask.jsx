import React from 'react'
import { useDispatch } from 'react-redux'
import { deleteTodo,toggleTodo } from '../store/todoSlice'
const TodoTask = ({Task}) => {
  const dispatch = useDispatch()
  const toggleTaskComplete=(id)=> dispatch(toggleTodo(id))
  const removeTask=(id)=>{
    dispatch(deleteTodo(id))}
  return (
    <div className='TodoListItem'>
        <input type="checkbox" checked={Task.completed} onChange={()=>toggleTaskComplete(Task.id)}/>
        <span>{Task.title}</span>
        <button onClick={()=>removeTask(Task.id)} ></button>
    </div>
  )
}

export default TodoTask