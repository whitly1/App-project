import React, { Component } from 'react'
import userUtils from '../utils/userUtils'
import todosUtils from '../utils/todosUtils'
import postsUtils from '../utils/postsUtils'
import OtherDataComp from './otherDataComp'
import TodosComp from './todosComp'
import PostsComp from './postsComp'
import '../App.css'
class UserComp extends Component {
    constructor(props) {
        super(props)
        this.state = { oldTodos: this.props.todos, todos: this.props.todos, posts: this.props.posts, user: this.props.user, color: false, click: false, otherDataDiv: "hidden", street: this.props.user.address.street, city: this.props.user.address.city, zipcode: this.props.user.address.zipcode }
    }
    // on load the data from the props is saved to the state
    async componentDidMount() {
        let newUser = await userUtils.getUser(this.props.user.id);
        this.setState({ user: newUser });
        let newColor = await todosUtils.checkCompleted(this.state.user.id);
        this.setState({ color: newColor });
        let posts = await postsUtils.getPosts(this.props.user.id);
        this.setState({ posts: posts });
        let todos = await todosUtils.getTodos(this.props.user.id);
        this.setState({ todos: todos });
    }

    update = () => {
        let user = { ...this.state.user }
        user.address.street = this.state.street;
        user.address.city = this.state.city;
        user.address.zipcode = this.state.zipcode;
        this.setState({ user: user })
        this.props.userToUpdate(this.state.user)
    }
    delete = () => {
        this.props.idToDelete(this.state.user.id);
    }
    getName = (data) => {
        let name = data;
        let user = { ...this.state.user };
        user.name = name;
        this.setState({ user: user });
    }
    getEmail = (data) => {
        let email = data;
        let user = { ...this.state.user };
        user.email = email;
        this.setState({ user: user });
    }


    render() {
        let borderColor;
        let todos = this.state.todos
        let posts = this.state.posts
        let check = this.state.todos.every(todo => todo.completed == true)
        if (this.state.todos.length == this.state.oldTodos.length) {
            check == true ? borderColor = "2px solid green" : borderColor = "2px solid red"
        } else {
            this.state.color ? borderColor = "2px solid green" : borderColor = "2px solid red"
        }
        let otherDataToRender;
        if (this.state.otherDataDiv == "hidden") {
            otherDataToRender = ""
        }
        else if (this.state.otherDataDiv == "visible") {
            otherDataToRender = <div>
                <OtherDataComp user={this.props.user} streetValue={data => { this.setState({ street: data }) }} cityValue={data => { this.setState({ city: data }) }} zipcodeValue={data => { this.setState({ zipcode: data }) }} />
            </div>
        }
        let divClass;
        let todosAndPostsToRender;
        if (this.state.click == false) {
            todosAndPostsToRender = ""
            divClass = "white"
        }
        if (this.state.click == true) {
            divClass = "orange"
            todosAndPostsToRender = <div>
                <TodosComp todos={todos} user={this.state.user} getTodo={(data) => {
                    let newTodo = data;
                    this.setState(prevState => ({ todos: [...prevState.todos, newTodo] }))
                    this.setState(prevState => ({ oldTodos: [...prevState.oldTodos, newTodo] }));
                }}
                    toGrandfather={(data) => {
                        let index = this.state.todos.findIndex((todo) => todo.title == data.title)
                        let updatedTodos = this.state.todos
                        updatedTodos.splice(index, 1, data)
                        this.setState({ todos: updatedTodos })
                    }} />
                <PostsComp posts={posts} user={this.state.user} getPost={(data) => {
                    let user = { ...this.state.user };
                    let newPost = data;
                    user.posts.push(newPost);
                    this.setState({ user: user });
                    this.setState({ posts: this.state.user.posts });
                }} />
            </div>
        }

        return (
            <div className={divClass} style={{ border: borderColor }}>
                <label onClick={() => {
                    this.setState(prevState => ({ click: !prevState.click }))
                }}>Id:{this.props.user.id}</label><br />
                Name:<input type="text" defaultValue={this.state.user.name} onChange={(e) => { this.getName(e.target.value) }} /><br />
                Email:<input type="text" defaultValue={this.state.user.email} onChange={(e) => { this.getEmail(e.target.value) }} /><br />
                <input type="button" value="update" onClick={this.update} />
                <input type="button" value="delete" onClick={this.delete} />
                <div>
                    <input type="button" value="Other Data" onMouseOver={() => { this.setState({ otherDataDiv: "visible" }) }} onClick={() => { this.setState({ otherDataDiv: "hidden" }) }}></input>
                    {otherDataToRender}
                    <div>
                        {todosAndPostsToRender}
                    </div>
                </div>
            </div>
        )
    }
}
export default UserComp