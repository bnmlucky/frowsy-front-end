import React, { Component } from "react";
import axios from "axios";

class CreateNew extends Component {
  constructor() {
    super();
    this.state = {
      task: ""
    };
    //BINDING
    this.CreateNewTask = this.CreateNewTask.bind(this);
    this.SubmitTask = this.SubmitTask.bind(this);
  }

  CreateNewTask(event) {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  }

  async SubmitTask(event) {
    try {
      event.preventDefault();
      //NEED TO VALIDATE URL BELOW
      const url = "http://localhost:3003/tasks";
      const load = {
        task: this.state.task
      };
      await axios.post(url, load);
      await this.props.getTasks();
    } catch (error) {
      console.log("Create Submit Error!", error);
    }
  }

  render() {
    return (
      <div>
        <h2>Create new</h2>
        <form onSubmit={this.SubmitTask}>
          <input
            type="text"
            name="task"
            placeholder="Tell us things..."
            onChange={this.CreateNewTask}
          />
          <input type="submit" value="Add" />
        </form>
      </div>
    );
  }
}

export default CreateNew;
