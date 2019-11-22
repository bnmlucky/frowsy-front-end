import React, { Component } from "react";
import axios from "axios";
const baseURL = "http://localhost:3003";
class CreateNew extends Component {
  constructor() {
    super();
    this.state = {
      tasks: []
    };
    this.CreateNewTask = this.CreateNewTask.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({
      tasks: event.currentTarget.value
    });
    console.log(tasks);
  }

  async CreateNewTask(event) {
    event.preventDefault();
    console.log(this.state.tasks);
    // const taskDescription = { description: this.state.tasks };
    const response = await axios.post(`${baseURL}/tasks/${this.props.user}`, {
      description: this.state.tasks,
      progress: "todo"
    });
    console.log(response);
    this.setState({ tasks: [] });
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
