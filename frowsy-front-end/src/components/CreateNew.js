import React, { Component } from "react";
import axios from "axios";
const baseURL = "http://localhost:3003";
class CreateNew extends Component {
  constructor() {
    super();
    this.state = {
      tasks: []
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
    console.log(this.state.tasks);

    const response = await axios.post(`${baseURL}/tasks/${this.props.user}`, {
      description: this.state.tasks,
      progress: "todo"
    });
    console.log(response);
    this.setState({ tasks: [] });
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
