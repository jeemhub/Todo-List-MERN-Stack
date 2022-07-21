import {React,useState,useEffect} from 'react'
import './App.css'
import axios from 'axios';

function App() {
 const [todoInput,settodoInput]=useState('');
 const [todoList,settodoList]=useState([]);
 const del=(id)=>{
   const newtodos=todoList.filter(
    todo=>{
      return(
        todo._id != id
      )
    }
  )
  settodoList(newtodos)
  axios.delete(`https://todojeem.herokuapp.com/delete/${id}`)

}
const addBtn=()=>{
  const val=document.querySelector('#inputTodo').value;
  if(val === ''){
    alert('write some thing')
  }else{
    const data={
      text:todoInput,
    }
    axios.post('https://todojeem.herokuapp.com/add',data);
    document.querySelector('#inputTodo').value='';
  }
}

useEffect(()=>{
  axios.get('https://todojeem.herokuapp.com/')
  .then(Response=>{settodoList(Response.data)})
  .catch(err=>{console.log(err)})

})
  return (
    <div className='container'>
      <input 
      id="inputTodo"
      type="text" 
      className='shadow-md mb-3 w-full h-11 p-5 bg-violet-300 rounded-md placeholder:text-violet-900'
      placeholder='writ some thing todo'
      onChange={(e)=>settodoInput(e.target.value)}
      />
      <button 
      className='shadow-md  p-2 mb-5 rounded-md bg-violet-500 text-violet-100 w-full'
      onClick={addBtn}
      >ADD</button>
      <br/>
      <div>    
        {todoList.map(todos=>{
          return(
            <div
            className='flex flex-row justify-between shadow m-3 text-start p-2 pl-4' 
            key={todos._id}
            >
              <div>
              {todos.text}
              </div>
            <button className='cursor-pointer' onClick={()=>del(todos._id)}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 " fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              
              </svg>
            </button>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default App
