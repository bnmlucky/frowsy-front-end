import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import MainContent from "./components/MainContent";
import NewUser from "./components/NewUser";
import Home from "./components/Home.js";
import Login from "./components/Login";
import axios from "axios";
import "./App.css";
import { Redirect } from "react-router";
import "bootstrap/dist/css/bootstrap.min.css";
const baseURL = "http://localhost:3003";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      loggedIn: false,
      userid: "",
      navToggle: false
    };
    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogOut = this.handleLogOut.bind(this);
    this.getTasks = this.getTasks.bind(this);
  }

  componentDidMount() {
    const localStorageLength = localStorage.length > 0;
    {
      localStorageLength && this.getTasks();
    }
  }
  async getTasks() {
    const userID = await localStorage.getItem("user");
    const response = await axios.get(`${baseURL}/users/${userID}`);

    this.setState({
      tasks: response.data.foundUser.tasks,
      loggedIn: true,
      userid: localStorage.user
    });
  }
  //LOGOUT
  async handleLogOut() {
    const response = await axios.delete(`${baseURL}/sessions`);
    console.log(response);
    localStorage.clear();

    this.setState({
      tasks: [],
      loggedIn: false,
      userid: ""
    });
  }

  handleAddUser(user) {
    console.log(user);
  }
  async handleLogin(user) {
    let userKey = "user";

    localStorage.setItem(userKey, user.foundUser._id);

    this.setState({
      tasks: user.foundUser.tasks,
      loggedIn: true,
      userid: user.foundUser._id
    });

    console.log(this.state.loggedIn);
  }
  //RENDER/RETURN
  render() {
    return (
      <Router>
        <div className="appJs-main-div">
          <div className="topDivHeaderRegisterLogin">
            <div className="FullNav">
              <h1>
                <Link
                  className="navigation-link-head "
                  className="h1"
                  to="/Home"
                >
                  F R O W S Y
                </Link>
              </h1>

              <nav className="navigation">
                <Link className="navigation-link nav-item" to="/NewUser">
                  Create Account
                </Link>
                {!this.state.loggedIn && (
                  <Link className="navigation-link nav-item" to="/LogIn">
                    Log In
                  </Link>
                )}

                {localStorage.length > 0 ? (
                  <Link className="navigation-link nav-item" to="/Tasks">
                    My Tasks
                  </Link>
                ) : (
                  <Redirect from="/Tasks" to="Home" />
                )}

                {this.state.loggedIn && (
                  <button
                    className="logout-button nav-item"
                    onClick={this.handleLogOut}
                  >
                    Log Out
                  </button>
                )}
              </nav>
              <Route path="/Home" exact component={Home} />
              <Route
                path="/NewUser"
                render={props => (
                  <NewUser {...props} handleAddUser={this.handleAddUser} />
                )}
              />

              {this.state.loggedIn ? (
                <Redirect from="/LogIn" to="/Tasks" />
              ) : (
                <Route
                  path="/LogIn"
                  render={props => (
                    <Login {...props} handleLogin={this.handleLogin} />
                  )}
                />
              )}
              {this.state.loggedIn && (
                <Route
                  path="/Tasks"
                  render={props => (
                    <MainContent
                      {...props}
                      userid={this.state.userid}
                      tasks={this.state.tasks}
                      getTasks={this.getTasks}
                      logOut={this.handleLogOut}
                    />
                  )}
                />
              )}
            </div>
          </div>
          <footer>
            Created by Alice D'Arcangelo, Guadalupe Ramirez and Natalia Titova
          </footer>
        </div>
      </Router>
    );
  }
}

export default App;
