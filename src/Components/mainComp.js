import React, { Component } from 'react'
import userUtils from '../utils/userUtils'
import UserComp from './userComp'
import SearchComp from './searchComp'
import todosUtils from '../utils/todosUtils'
import postsUtils from '../utils/postsUtils'
class MainComp extends Component {
    constructor() {
        super()
        this.state = { users: [], todos: [], posts: [], search: "", idToDelete: '', userToUpdate: {}, check: false, newName: "", newEmail: "" }
    }
    // geting all the data from the apis and storing them in the state on first render
    async componentDidMount() {
        let todosResp = await todosUtils.getAll("https://jsonplaceholder.typicode.com/todos");
        let todos = todosResp.data;
        this.setState({ todos: todos });
        let postsResp = await postsUtils.getAll("https://jsonplaceholder.typicode.com/posts");
        let posts = postsResp.data;
        let resp = await userUtils.getAll("https://jsonplaceholder.typicode.com/users");
        let users = resp.data;
        this.setState({ users: users });
        this.setState({ posts: posts });
    }

    // rerendering the comp when a user is updated or deleted
    componentDidUpdate(prevProps, prevState) {
        if (prevState.idToDelete !== this.state.idToDelete) {
            let usersTemp = this.state.users;
            let index = this.state.users.findIndex(user => user.id === this.state.idToDelete);
            usersTemp.splice(index, 1);
            this.setState({ users: usersTemp });
        }
        else if (prevState.userToUpdate !== this.state.userToUpdate) {
            let usersTemp = this.state.users;
            let index = this.state.users.findIndex(user => user.id === this.state.userToUpdate.id);
            usersTemp.splice(index, 1, this.state.userToUpdate);
            this.setState({ users: usersTemp });
        }
    }


    // adding a user function and saving the updatedUsers array
    add = () => {
        let usersTemp = this.state.users;
        let id = usersTemp[usersTemp.length - 1].id;
        let newUser = {
            id: id + 1,
            name: this.state.newName,
            email: this.state.newEmail,
            address: {
                street: "",
                city: "",
                zipcode: ""
            },
            todos: [],
            posts: []
        };
        usersTemp.push(newUser);
        this.setState({ users: usersTemp });
        this.setState({ check: false });
    }
    render() {
        let usersToRender;
        let mainDiv;
        // if add button is pressed the main page rerenders to the add user page
        if (this.state.check) {
            mainDiv = <div>
                <h1>Add New User</h1>
                Name:<input type="text" onChange={(e) => { this.setState({ newName: e.target.value }) }} /><br />
                Email:<input type="text" onChange={(e) => { this.setState({ newEmail: e.target.value }) }} /><br />
                <input type="button" value="Add New User" onClick={this.add} />
                <input type="button" value="cancel" onClick={(e) => { this.setState({ check: false }) }} />
            </div>
        }
        else {
            mainDiv =
                <div>
                    <input type="button" value="Add" onClick={(e) => { this.setState({ check: true }) }} />
                    <SearchComp cbk={(data) => this.setState({ search: data })} />
                </div>
            // if there is an input in the search comp the page rerenders according to the search
            if (this.state.search.length > 0) {
                usersToRender = this.state.users.map((user) => {
                    let name = user.name;
                    let email = user.email;
                    let lowerName = name.toLowerCase();
                    let lowerEmail = email.toLowerCase();
                    if (lowerName.includes(this.state.search) || lowerEmail.includes(this.state.search)) {
                        return <UserComp key={user.id} todos={this.state.todos.filter(todo => todo.userId == user.id)} posts={this.state.posts.filter(post => post.userId == user.id)} user={user} userToUpdate={(data) => {
                            this.setState({ userToUpdate: data })
                        }} idToDelete={(data) => {
                            this.setState({ idToDelete: data });
                        }} />
                    }
                })
            }
            else {
                usersToRender = this.state.users.map((user) => {
                    return <UserComp key={user.id} user={user} posts={this.state.posts.filter(post => post.userId == user.id)} todos={this.state.todos.filter(todo => todo.userId == user.id)} userToUpdate={(data) => {
                        this.setState({ userToUpdate: data })
                    }} idToDelete={(data) => {
                        this.setState({ idToDelete: data })
                    }} />
                })
            }
        }
        return (
            <div style={{ border: "3px solid black" }}>
                {mainDiv}
                {usersToRender}
            </div>

        )
    }
}
export default MainComp