import React, { Component } from "react";
import axios from "axios";
import CreateNew from "../components/CreateNew";
import Update from "../components/Update";
import Task from "./Task.js";

class MainContent extends Component {
  constructor() {
    super();
    this.state = {
      user: this.user,
      loggedIn: true,
      tasks: []
    };
  }

  componentDidMount() {
    const tasks = this.props.tasks;
    this.setState({ task: tasks });
  }

  render() {
    return (
      <main>
        {/* {this.state.task(tasks => {
          return ( */}
        <div className="mainContent-main-div">
          <h1>Frowsy</h1>
          <h2>Main Content is here</h2>
          <div className="ToDo">
            To Do: {this.state.tasks}
            <Task />
          </div>
          <div className="Doing">Doing:</div>
          <div className="Done">Done:</div>
          <br />
          <CreateNew tasks={this.tasks} />
        </div>
        {/* );
        })} */}
      </main>
    );
  }
}

export default MainContent;
