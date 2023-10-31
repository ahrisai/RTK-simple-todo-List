import React from 'react'
import './App.css'
import { useState } from 'react'
import TodoList from './components/todoList'
import { useDispatch } from 'react-redux'
import {addTodo} from './store/todoSlice'
import { useEffect } from 'react'
import { fetchTodos } from './store/todoSlice'
function App() {


  console.log('sds')

const [title, setTitle] = useState('')

const dispatch = useDispatch()

const addTask=()=>{

  dispatch(addTodo({title}))
  setTitle('')
}



  return (
   
    <>
     <label >
      <input type="text" value={title} onChange={(e)=>{setTitle(e.target.value)}} />
      <button onClick={addTask}>добавить задачу</button>
     </label>
     <TodoList />
    </>
  )
}

export default App
