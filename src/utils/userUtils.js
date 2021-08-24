import axios from 'axios'
import todosUtils from './todosUtils';
import postsUtils from './postsUtils';
const getAll=async(url)=>{
let users=await axios.get(url)
return users;
}
const getUser=async(id)=>{
let resp=await axios.get(`https://jsonplaceholder.typicode.com/users/${id}`)
let user=resp.data
let newUser={
    id:user.id,
    name:user.name,
    email:user.email,
    address:{
        street:user.address.street,
        city:user.address.city,
        zipcode:user.address.zipcode
    },
    todos:await todosUtils.getTodos(id),
    posts:await postsUtils.getPosts(id)
}
return newUser
}

const editUser=async(id,obj)=>{
    return await axios.put(`https://jsonplaceholder.typicode.com/users/${id}`,obj)
    }
const deleteUser=async(id)=>{
    return axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`)   
}








export default {getAll,getUser,editUser,deleteUser}