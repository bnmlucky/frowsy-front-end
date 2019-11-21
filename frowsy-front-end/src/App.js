import React, { Component } from "react";
import "./App.css";
import MainContent from "./components/MainContent";
import axios from "axios";

class App extends Component {
  handleAddUser(user) {
    console.log(user);
  }
  //RENDER/RETURN
  render() {
    return (
      <div className="appJs-main-div">
        <h2>Hello</h2>
        <MainContent />
      </div>
    );
  }
}

export default App;
