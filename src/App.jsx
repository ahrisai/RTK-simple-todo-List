import React from 'react'
import './App.css'
import { useState } from 'react'
import TodoList from './components/todoList'
import { useDispatch } from 'react-redux'
import { addNewToDo } from './store/todoSlice'
import Form from './components/Form/Form'
function App() {
  return (
   
    <div className='App'>
    <Form/>
     <TodoList />
    </div>
  )
}

export default App
