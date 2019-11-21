import React, { Component } from "react";
import "./App.css";
import MainContent from "./components/MainContent";
import NewUser from "./components/NewUser";
import Login from "./components/Login";
import axios from "axios";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      loggedIn: false
    };
    this.handleLogin = this.handleLogin.bind(this);
  }
  //BINDING STATEMENTS
  // }
  // componentDidMount() {
  //WE WILL HAVE A CALL FROM THE BACK-END
  // }
  //ASYNC CALLS --
  handleAddUser(user) {
    console.log(user);
  }
  handleLogin(user) {
    console.log(user.foundUser.tasks);
    this.setState({
      tasks: user.foundUser.tasks,
      loggedIn: true
    });
  }
  //RENDER/RETURN
  render() {
    return (
      <div className="appJs-main-div">
        <h2>Hello</h2>
        <button>Register</button>
        <button>Login</button>
        <NewUser handleAddUser={this.handleAddUser} />
        <Login handleLogin={this.handleLogin} />

        {this.state.loggedIn && <MainContent />}
      </div>
    );
  }
}

export default App;
