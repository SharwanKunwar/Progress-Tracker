import React, { useState } from 'react'
import { useTodo } from '../Context';

function TodoForm() {
    const [todo, setTodo] = useState("");
    const {addTodo} = useTodo();

    const add =(e)=>{
        e.preventDefault();

        if(!todo) return
        addTodo({todo, completed:false})
        setTodo("")
    }
  return (
    <form  onSubmit={add}
    className='flex'>
        <input 
        value={todo}
        onChange={(e)=>setTodo(e.target.value)}
        type="text" 
        placeholder='Write Todo...'
        className='w-full border border-black/10 rounded-l-lg px-3 outline-none duration-150 bg-white/20 py-3.5'
        />

        <button type='submit' className='rounded-r-lg md:px-10 px-5 py-1 bg-gray-900 text-white shrink-0'> Add </button>
    </form>
  )
}

export default TodoForm
