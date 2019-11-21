import React, { Component } from "react";
import axios from "axios";

class CreateNew extends Component {
  //   constructor() {
  //     super();
  //     this.state = {
  //       task: ""
  //     };
  //     //HANDLE ON CHANGE EVENT?
  //   }
  //ASYNC
  //   async CreateNewTask(event) {
  //     try {
  //       event.preventDefault();
  //       //NEED TO VALIDATE URL BELOW
  //       const url = "http://localhost:3003/bookmarks";
  //       const load = {
  //         task: this.state.task
  //       };
  //     }
  //   }
  render() {
    return (
      <div>
        <h2>Create new</h2>
        <form>
          <input type="text" name="task" placeholder="Tell us things..." />
          <input type="submit" value="Add" />
        </form>
      </div>
    );
  }
}

export default CreateNew;
