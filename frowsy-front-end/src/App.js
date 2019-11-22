import React, { Component } from "react";
import "./App.css";
import MainContent from "./components/MainContent";
import NewUser from "./components/NewUser";
import Login from "./components/Login";
import axios from "axios";
const baseURL = "http://localhost:3003";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      loggedIn: false,
      userid: ""
    };
    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogOut = this.handleLogOut.bind(this);
    this.getTasks = this.getTasks.bind(this);
  }
  componentDidMount() {
    const localStorageLength = localStorage.length > 0;
    {
      localStorageLength && this.getTasks();
    }
  }
  async getTasks() {
    const newTasks = await JSON.parse(localStorage.getItem("tasks"));

    this.setState({
      tasks: newTasks,
      loggedIn: true,
      userid: localStorage.user
    });
    console.log(this.state);
  }
  //LOGOUT
  async handleLogOut() {
    const response = await axios.delete(`${baseURL}/sessions`);
    console.log(response);
    localStorage.clear();

    this.setState({
      tasks: [],
      loggedIn: false,
      userid: ""
    });
  }

  handleAddUser(user) {
    console.log(user);
  }
  handleLogin(user) {
    let userKey = "user";
    let tasks = "tasks";
    localStorage.setItem(userKey, user.foundUser._id);
    localStorage.setItem(tasks, JSON.stringify(user.foundUser.tasks));
    console.log(localStorage.tasks);
    this.setState({
      tasks: user.foundUser.tasks,
      loggedIn: true,
      userid: user.foundUser._id
    });
    console.log(this.state.tasks);
  }
  //RENDER/RETURN
  render() {
    return (
      <div className="appJs-main-div">
        <h2>Hello</h2>

        <button>Register</button>
        <button>Login</button>
        {this.state.loggedIn && (
          <button onClick={this.handleLogOut}>Log Out</button>
        )}
        <NewUser handleAddUser={this.handleAddUser} />
        <Login handleLogin={this.handleLogin} />

        {this.state.loggedIn && (
          <MainContent userid={this.state.userid} tasks={this.state.tasks} getTasks={this.getTasks} />
        )}
      </div>
    );
  }
}

export default App;
