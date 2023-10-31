import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'
export const fetchTodos=createAsyncThunk(
    'todos/fetchTodos',
    async (_,{rejectWithValue})=>{
        
        const response = await axios.get('https://jsonplaceholder.typicode.com/todos',{
            params:{
                _limit:10
            }
        
        }).then(res=>res.data)
        .catch((e)=>{
            return rejectWithValue(e.message)
        })
        
        return response
    }

)

export const deleteTodo=createAsyncThunk(
    'todos/deleteTodo',
    async (id,{rejectWithValue,dispatch})=>{
        await axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`)
        .then(res=>{
            dispatch(removeTodo({id}))
            return res
        })
        .catch(e=>{
            return rejectWithValue(e.message)
        })
    }
    
)
const todoSlice = createSlice({
  name: "todos",
  initialState: {
    todos: [],
    status:null,
    error:null
  },
  reducers: {
    addTodo(state, action) {
      state.todos.push({
        id: new Date().getTime(),
        title: action.payload.title,
        completed: false,
      });
    },
    toggleTodoComplete(state, action) {
        // state.todos.map(todo=>todo.id===action.payload.id?{...todo, completed:!action.payload.completed}:todo)
        const neededTodo=state.todos.find(todo=>todo.id===action.payload.id)
        neededTodo.completed=!neededTodo.completed;
    },
    removeTodo(state,action){
        state.todos=state.todos.filter(todo=>todo.id!==action.payload.id)
    }
  },
  extraReducers:{
    [fetchTodos.pending]:(state,action)=>{
        state.status='loading',
        state.error=null;
        
    },
    [fetchTodos.fulfilled]:(state,action)=>{
        state.status='resolved'
        state.todos=action.payload
    },
    [fetchTodos.rejected]:(state,action)=>{
        console.log(action.payload)
        state.status='rejected'
        state.error=action.payload
    }
  }
});

export const {addTodo,removeTodo,toggleTodoComplete} = todoSlice.actions

export default todoSlice.reducer
