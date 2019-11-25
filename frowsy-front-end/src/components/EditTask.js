import React, { Component } from "react";
import axios from "axios";
const baseURL = "http://localhost:3003";

class EditTask extends Component {
  constructor() {
    super();
    this.state = {
      description: ""
    };
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleDescriptionChange(event) {
    this.setState({ description: event.currentTarget.value });
  }

  async handleSubmit(event) {
    event.preventDefault();
    const userId = localStorage.getItem("user");
    const taskId = this.props.task._id;
    const description = this.state.description
      ? this.state.description
      : this.props.task.description;
    const response = await axios.put(`${baseURL}/tasks/${userId}/${taskId}`, {
      description: description,
      assigned: "todo"
    });
    console.log(response);
    this.setState({
      description: ""
    });
    this.props.getTasks();
  }

  render() {
    return (
      <div className="editContainer">
        <form className="editContainer" onSubmit={this.handleSubmit}>
          <label htmlFor="description"></label>
          <input
            type="text"
            id="description"
            name="description"
            onChange={this.handleDescriptionChange}
            value={this.state.description}
            placeholder={this.props.task.description}
          />

          <input type="submit" value="Edit Task" />
        </form>
      </div>
    );
  }
}

export default EditTask;
