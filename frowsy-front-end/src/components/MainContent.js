import React, { Component } from "react";
import axios from "axios";
import CreateNew from "../components/CreateNew";
import Update from "../components/Update";
import NewUser from "../components/NewUser";
import { tsAnyKeyword } from "@babel/types";

class MainContent extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    const { allTasks, getTasks } = this.props;
    return (
      <div>
        {/* {allTasks.map(task => { */}
        {/* return ( */}
        <div className="mainContent-main-div">
          <h1>Frowsy</h1>
          <h2>Main Content is here</h2>
          <div className="ToDo">
            To Do:
            <ul>{/* <li>{task.task}</li> */}</ul>
          </div>
          <div className="Doing">Doing:</div>
          <div className="Done">Done:</div>
          <br />
          <CreateNew />
        </div>
        {/* );
        })} */}
      </div>
    );
  }
}

export default MainContent;
