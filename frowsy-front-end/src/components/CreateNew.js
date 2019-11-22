import React, { Component } from "react";
import axios from "axios";

class CreateNew extends Component {
  constructor() {
    super();
    this.state = {
      tasks: ""
    };
    this.createNewTask = this.createNewTask.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({
      tasks: event.currentTarget.value
    });
    console.log(this.state.tasks);
  }

  async createNewTask(event) {
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
      <form onSubmit={this.createNewTask}>
        Task:
        <label htmlFor="task"></label>
        <input
          type="text"
          name="task"
          id="task"
          value={this.state.tasks}
          placeholder="Tell us things..."
          onChange={this.handleChange}
        />
        <input type="submit" value="Add" />
      </form>
    );
  }
}

export default CreateNew;
