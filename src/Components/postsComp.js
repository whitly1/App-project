import React, { Component } from 'react'
import PostComp from './postComp'
class PostsComp extends Component{
    constructor(props){
        super(props)
        this.state={user:this.props.user,posts:this.props.posts,check:false,postTitle:"",postBody:""}
    }
    addPost=()=>{
        let newPost={
            title:this.state.postTitle,
            body:this.state.postBody
        }
        this.props.getPost(newPost)
        this.setState({check:false})
    }
    render(){
        let mainDiv;
        let postsToRender;
        if(this.state.check){
            mainDiv=<div>
            <h1>New Post User{this.state.user.id}:</h1> <br/>
            <input type="button" value="Add" onClick={this.addPost}/>
            <input type="button" value="cancel" onClick={(e)=>{this.setState({check:false})}}/><br/>
            <span>Title<input type="text" onChange={(e)=>{this.setState({postTitle:e.target.value})}}/></span><br/>
            Body:<input type="text" onChange={(e)=>{this.setState({postBody:e.target.value})}}/>
            </div>
            
        }else{
            mainDiv=<div>
           <h1>Posts User{this.state.user.id}:</h1> 
            <input type="button" value="addPost" onClick={(e)=>{this.setState({check:true})}}/>
            </div>
           postsToRender=this.props.posts.map(post=>{
                return<PostComp key={post.id} post={post}/>
            })
        }
        return(
            <div>
                {mainDiv}
                {postsToRender}
            </div>
        )
    }
}
export default PostsComp