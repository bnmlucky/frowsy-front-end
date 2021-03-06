import React, { Component } from "react";
import axios from "axios";
const baseURL = "http://localhost:3003";
// import { Redirect } from "react-router";
class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: ""
    };
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleUserNameChange = this.handleUserNameChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleUserNameChange(event) {
    this.setState({ username: event.currentTarget.value });
  }
  handlePasswordChange(event) {
    this.setState({ password: event.currentTarget.value });
  }
  async handleSubmit(event) {
    console.log("hitting submit route");
    event.preventDefault();

    const response = await axios.post(`${baseURL}/sessions`, {
      username: this.state.username,
      password: this.state.password
    });

    this.setState({ username: "", password: "" });
    this.props.handleLogin(response.data);
  }
  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit} className="LogInForm">
          <label htmlFor="username"></label>
          <input
            type="text"
            className="form-control"
            id="exampleInputEmail1"
            name="username"
            onChange={this.handleUserNameChange}
            value={this.state.username}
            placeholder="username"
          />
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            name="password"
            onChange={this.handlePasswordChange}
            value={this.state.password}
            placeholder="password"
          />
          <input type="submit" className="login-button" value="Log In" />
        </form>
      </div>
    );
  }
}

export default Login;
