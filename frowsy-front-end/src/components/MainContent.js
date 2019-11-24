import React, { Component } from "react";
import axios from "axios";
import CreateNew from "../components/CreateNew";
import Update from "../components/Update";
import Task from "./Task.js";
import EditTask from "./EditTask.js";
const baseURL = "http://localhost:3003";
class MainContent extends Component {
  constructor() {
    super();
    this.state = {
      user: "",
      loggedIn: true,
      tasks: []
    };
    this.handleAddTask = this.handleAddTask.bind(this);
    this.handleDeleteTask = this.handleDeleteTask.bind(this);
    this.handleEditTask = this.handleEditTask.bind(this);
  }
  handleAddTask(task) {
    console.log(task);
    this.setState({ tasks: [...this.state.tasks, task] });
  }
  async handleDeleteTask(task) {
    const userID = await localStorage.getItem("user");
    const taskID = task._id;

    const response = await axios.delete(`${baseURL}/tasks/${userID}/${taskID}`);

    this.props.getTasks();
  }
  handleEditTask(event) {
    console.log("edit task clicked");
  }
  componentDidMount() {
    const tasks = this.props.tasks;
    this.setState({ task: tasks, user: this.props.userid });
  }

  render() {
    return (
      <main>
        <CreateNew
          user={this.state.user}
          getTasks={this.props.getTasks}
          handleAddTask={this.handleAddTask}
        />
        <br />
        <div className="container">
          To Do:
          {this.props.tasks.map(task => {
            return (
              <div className="ToDo" key={task._id}>
                <ul>
                  <li>
                    {task.description} &nbsp;
                    <button onClick={() => this.handleDeleteTask(task)}>
                      &#128465;
                    </button>{" "}
                    &nbsp;
                    <button onClick={this.handleEditTask}>✎</button> &nbsp;
                    <EditTask task={task} getTasks={this.props.getTasks} />
                  </li>
                </ul>
              </div>
            );
          })}
          <div className="Doing">Doing:</div>
          <div className="Done">Done:</div>
          <br />
        </div>
      </main>
    );
  }
}

export default MainContent;
