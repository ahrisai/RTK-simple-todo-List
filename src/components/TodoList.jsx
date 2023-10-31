import React from 'react'
import TodoTask from './TodoTask'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { fetchTodos } from '../store/todoSlice'
import Loader from './Loader/Loader'
const TodoList = () => {
  
  const tasks=useSelector(state=>state.todos.todos)
  const {status,error}=useSelector(state=>state.todos)
  const dispatch=useDispatch()
  useEffect(() => {
    dispatch(fetchTodos())
  

  }, [])

  return (
   
    <div>
      {status==='loading'&& <Loader/>}

   {error
   ?<h1>{error}</h1>
   :
      tasks.map(task=><TodoTask key={task.id} Task={task} />)
    }

    </div>
  )
}

export default TodoList