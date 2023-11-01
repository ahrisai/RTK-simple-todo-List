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
        dispatch(removeTodo({id}))
        await axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`)
        .catch(e=>{
            return rejectWithValue(e.message)
        })
    }
    
)
export const toggleTodo=createAsyncThunk(
    'todos/toggleTodo',
    async (id,{rejectWithValue,dispatch,getState})=>{
        const todo=getState().todos.todos.find(todo=>todo.id===id);
        dispatch(toggleTodoComplete({id}))
        await axios.patch(`https://jsonplaceholder.typicode.com/todos/${id}`,
        {completed:!todo.completed},
        {Headers:{'content-type':'application/json'}}
        ).then(res=>{
            console.log(res)
        })
        .catch(e=>{
            return rejectWithValue(e.message)
        })
    }
)

export const addNewToDo=createAsyncThunk(
    'todos/addNewToDo',
    async (title,{rejectWithValue,dispatch}) => {
        const todo={
            userId:1,
            title,
            completed:false
        }
      await axios.post(`https://jsonplaceholder.typicode.com/todos`,
      todo,
      {headers:{'content-type':'application/json'}}
      ).then(res=>{
        dispatch(addTodo(res.data))

      })
      .catch(e=>{
        return rejectWithValue(e.message)
      })
    }
)
const setError=(state,action) => {
  state.status='rejected'
  state.error=action.payload
}

const todoSlice = createSlice({
  name: "todos",
  initialState: {
    todos: [],
    status:null,
    error:null
  },
  reducers: {
    addTodo(state, action) {
      state.todos.push(action.payload);
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
    [fetchTodos.rejected]:setError,

    [deleteTodo.rejected]:setError
  }
});

export const {addTodo,removeTodo,toggleTodoComplete} = todoSlice.actions

export default todoSlice.reducer
