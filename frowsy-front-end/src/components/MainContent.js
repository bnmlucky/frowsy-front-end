import React, { Component } from "react";
import axios from "axios";
import CreateNew from "../components/CreateNew";
import Update from "../components/Update";

class MainContent extends Component {
  render() {
    return (
      <main>
        <h1>Frowsy</h1>
        <div className="ToDo">To Do:</div>
        <div className="Doing">Doing:</div>
        <div className="Done">Done:</div>
        <br />
        <CreateNew />
      </main>
    );
  }
}

export default MainContent;
