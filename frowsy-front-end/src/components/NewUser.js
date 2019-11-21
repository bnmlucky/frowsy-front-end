import React, { Component } from "react";
import axios from "axios";
const baseURL = "http://localhost:3003";
class NewUser extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: ""
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleUserNameChange = this.handleUserNameChange.bind(this);
  }
  handleUserNameChange(event) {
    this.setState({ username: event.currentTarget.value });
  }
  handlePasswordChange(event) {
    this.setState({ password: event.currentTarget.value });
  }
  async handleSubmit(event) {
    event.preventDefault();

    const response = await axios.post(`${baseURL}/users`, {
      username: this.state.username,
      password: this.state.password
    });

    this.setState({ username: "", password: "" });
    this.props.handleAddUser(response.data);
  }
  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="username"></label>
          <input
            type="text"
            id="username"
            name="username"
            onChange={this.handleUserNameChange}
            value={this.state.username}
            placeholder="username"
          />
          <input
            type="text"
            id="password"
            name="password"
            onChange={this.handlePasswordChange}
            value={this.state.password}
            placeholder="password"
          />
          <input type="submit" value="Create User" />
        </form>
      </div>
    );
  }
}

export default NewUser;
