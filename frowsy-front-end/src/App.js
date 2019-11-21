import React, { Component } from "react";
import "./App.css";
import MainContent from "./components/MainContent";
import NewUser from "./components/NewUser";
import axios from "axios";

class App extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //PROPERTIES FROM THE SCHEMS?
  // };
  //BINDING STATEMENTS
  // }
  // componentDidMount() {
  //WE WILL HAVE A CALL FROM THE BACK-END
  // }
  //ASYNC CALLS --
  handleAddUser(user) {
    console.log(user);
  }
  //RENDER/RETURN
  render() {
    return (
      <div className="appJs-main-div">
        <h2>Hello</h2>
        <button>Register</button>
        <button>Login</button>
        <NewUser handleAddUser={this.handleAddUser} />
        <MainContent />
      </div>
    );
  }
}

export default App;
