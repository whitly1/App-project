import axios from 'axios'
const getAll=async(url)=>{
    let todos=await axios.get(url)
    return todos;
    }
 const getTodos=async(id)=>{
let resp=await axios.get("https://jsonplaceholder.typicode.com/todos")
let todos=resp.data
let filterd=todos.filter(todo=>todo.userId==id)
let finalTodos=filterd.map(todo=>{
    let finalTodo={
title:todo.title,
completed:todo.completed
    }
    return finalTodo
})
return finalTodos
}
const checkCompleted=async(id)=>{
let todos=await getTodos(id)
let check=todos.every(todo=>todo.completed==true)
return check
}

export default {getAll,getTodos,checkCompleted}