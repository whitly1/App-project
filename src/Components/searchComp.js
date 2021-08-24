import React, { Component } from 'react'
import UserComp from './userComp'
class Searchcomp extends Component{
    constructor(){
        super()
        this.state={}
    }
    saveText=(data)=>{
this.props.cbk(data)
    }
  
    render(){
       
        return(
            <div>
              Search:<input type="text" onChange={(e)=>{this.saveText(e.target.value)}}></input><br/> 
            </div>
        )
    }
}
export default Searchcomp