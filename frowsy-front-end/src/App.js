import React, { Component } from "react";
import "./App.css";
import MainContent from "./components/MainContent";
import NewUser from "./components/NewUser";
import Login from "./components/Login";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
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
    // const newTasks = await JSON.parse(localStorage.getItem("tasks"));
    const userID = await localStorage.getItem("user");
    const response = await axios.get(`${baseURL}/users/${userID}`);
    // console.log(response.data.foundUser.tasks);
    this.setState({
      tasks: response.data.foundUser.tasks,
      loggedIn: true,
      userid: localStorage.user
    });
    // console.log(this.state);
    // console.log(userID);
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
  async handleLogin(user) {
    let userKey = "user";
    // let tasks = "tasks";
    localStorage.setItem(userKey, user.foundUser._id);
    // localStorage.setItem(tasks, JSON.stringify(user.foundUser.tasks)); //We still get an error at this line when we restart the nodemon, but we can exit out of it.

    // console.log(response);
    // console.log(localStorage.tasks);
    this.setState({
      tasks: user.foundUser.tasks,
      loggedIn: true,
      userid: user.foundUser._id
    });
  }
  //RENDER/RETURN
  render() {
    return (
      <div className="appJs-main-div">
        <h1>F R O W S Y</h1>
        <div className="topDivHeaderRegisterLogin">
          {this.state.loggedIn && (
            <button onClick={this.handleLogOut}>Log Out</button>
          )}
          <NewUser handleAddUser={this.handleAddUser} />
          <Login handleLogin={this.handleLogin} />
        </div>
        {this.state.loggedIn && (
          <MainContent
            userid={this.state.userid}
            tasks={this.state.tasks}
            getTasks={this.getTasks}
            handleLogin={this.handleLogin}
          />
        )}
      </div>
    );
  }
}

export default App;
