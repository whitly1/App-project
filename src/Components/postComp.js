import React, { Component } from 'react'
class PostComp extends Component{
    constructor(props){
        super(props)
        this.state={post:this.props.post}
    }
    render(){
        return(
            <div style={{border:"2px solid purple"}}>
                Title:{this.state.post.title}<br/>
                Body:{this.state.post.body}<br/>
            </div>
        )
    }
}
export default PostComp