import axios from 'axios'
const getAll=async(url)=>{
    let posts=await axios.get(url)
    return posts;
    }
const getPosts=async(id)=>{
    let resp=await axios.get("https://jsonplaceholder.typicode.com/posts")
    let posts=resp.data
    let userPosts=posts.filter(post=>post.userId==id)
    return userPosts
}
export default {getAll,getPosts}