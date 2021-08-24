import logo from './logo.svg';
import './App.css';
import React, { Component } from 'react'
import MainComp from './Components/mainComp';
class App extends Component{
  constructor(){
    super()
  }
  render(){
    return(
      <div className="App">
        <MainComp/>
      </div>
    )
  }
}

export default App;
