import React, { Component } from 'react'
import TodoComp from './todoComp';
class TodosComp extends Component {
    constructor(props) {
        super(props)
        this.state = { user: this.props.user, todos: this.props.todos, newTodos: [], check: false, todoTitle: "" }
    }
    add = () => {
        let newTodo = {
            title: this.state.todoTitle,
            completed: false
        }
        this.props.getTodo(newTodo)
        this.setState({ check: false })
    }
    render() {
        let mainDiv;
        let divToRender;
        if (this.state.check) {
            mainDiv = <div>
                <h1>New Todo-User{this.state.user.id}:</h1><br />
                <input type="text" onChange={(e) => { this.setState({ todoTitle: e.target.value }) }} /><br />
                <input type="button" value="Add" onClick={this.add} />
                <input type="button" value="cancel" onClick={(e) => { this.setState({ check: false }) }} />
            </div>
        }
        else {
            mainDiv = <div>
                <h1>Todos-User{this.state.user.id}:</h1>
                <input type="button" value="addTodo" onClick={(e) => { this.setState({ check: true }) }} />
            </div>
            divToRender = this.props.todos.map((todo) => {
                return <TodoComp key={todo.id} todo={todo} toFather={(data) => { this.props.toGrandfather(data) }} />
            })
        }

        return (
            <div>
                {mainDiv}
                {divToRender}
            </div>
        )
    }
}
export default TodosComp