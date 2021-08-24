import React, { Component } from 'react'
import '../App.css'
class TodoComp extends Component{
    constructor(props){
        super(props)
        this.state={todo:this.props.todo}
    }
   
change=()=>{
let newTodo={
    ...this.state.todo,
    title:this.state.todo.title,
    completed:true
}
this.setState({todo:newTodo})
this.props.toFather(newTodo)

}
    render(){  
 let markedBtn=!this.state.todo.completed? <input type="button" value="Mark Completed" onClick={this.change}/>:""
        return(
            <div style={{border:"2px solid purple"}}>
                Title:{this.state.todo.title} <br/>
                completed:{JSON.stringify(this.state.todo.completed)} <br/>
             {markedBtn}
            </div>
        )
    }
}
export default TodoComp