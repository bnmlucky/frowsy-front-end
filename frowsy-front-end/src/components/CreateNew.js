import React, { Component } from "react";
import axios from "axios";

class CreateNew extends Component {
  constructor() {
    super();
    this.state = {
      tasks: ""
    };
    this.CreateNewTask = this.CreateNewTask.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({
      tasks: event.currentTarget.value
    });
  }

  async CreateNewTask(event) {
    event.preventDefault();
    try {
      const url = "http://localhost:3003/tasks";
      await axios.post(url, { tasks: this.state.tasks, user: this.props.user });
    } catch (error) {
      console.log("We have an Error!", error);
    }
  }
  render() {
    return (
      <form onSubmit={this.CreateNewTask}>
        Task:
        <input
          type="text"
          name="task"
          placeholder="Tell us things..."
          onChange={this.handleChange}
        />
        <input type="submit" value="Add" />
      </form>
    );
  }
}

export default CreateNew;
