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
        <div className="createNewDiv">
          <CreateNew
            user={this.state.user}
            getTasks={this.props.getTasks}
            handleAddTask={this.handleAddTask}
          />
        </div>
        <br />
        <div className="container">
          <div id="ToDoDiv" className="col" className="flex-item">
            <p className="title">TO DO</p>
            {this.props.tasks.map(task => {
              return (
                <div className="ToDo" key={task._id}>
                  <ul className="flex-item-2">
                    <li>
                      {task.description} &nbsp;
                      <div className="ListBtn">
                        <button
                          typeof="button"
                          className="btn btn-outline-secondary"
                          onClick={() => this.handleDeleteTask(task)}
                        >
                          &#128465;
                        </button>{" "}
                        <button
                          typeof="button"
                          className="btn btn-outline-secondary"
                          onClick={this.handleEditTask}
                        >
                          ✎
                        </button>{" "}
                      </div>
                      &nbsp;
                      <EditTask task={task} getTasks={this.props.getTasks} />
                    </li>
                  </ul>
                </div>
              );
            })}
          </div>
          <div id="DoingDiv" className="col" className="Doing flex-item">
            <p className="title">DOING</p>
          </div>
          <div id="DoneDiv" className="col" className="Done flex-item">
            <p className="title">DONE</p>
          </div>
          <br />
        </div>
      </main>
    );
  }
}

export default MainContent;
