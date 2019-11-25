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

    this.props.getTasks();

    this.setState({ tasks: [] });
    this.props.handleAddTask(response.data);
  }

  render() {
    return (
      <form onSubmit={this.createNewTask}>
        <div id="inputForm" className="input-group mb-3">
          <label htmlFor="task"></label>
          <input
            type="text"
            name="task"
            id="task"
            className="form-control"
            value={this.state.tasks}
            placeholder="Tell us the things you need to do..."
            onChange={this.handleChange}
          />
          <input
            type="submit"
            value="Add"
            className="btn btn-outline-secondary"
            id="button-addon2"
          />
        </div>
      </form>
    );
  }
}

export default CreateNew;
