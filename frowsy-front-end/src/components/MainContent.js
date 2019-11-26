import React, { Component } from "react";
import axios from "axios";
import CreateNew from "../components/CreateNew";
import EditTask from "./EditTask.js";
const baseURL = "http://localhost:3003";
class MainContent extends Component {
  constructor() {
    super();
    this.state = {
      user: "",
      loggedIn: true,
      tasks: [],
      toggleEditBtn: false
    };
    this.handleAddTask = this.handleAddTask.bind(this);
    this.handleDeleteTask = this.handleDeleteTask.bind(this);
    this.handleChangeDoing = this.handleChangeDoing.bind(this);
    this.handleChangeToDo = this.handleChangeToDo.bind(this);
    this.handleChangeDone = this.handleChangeDone.bind(this);
    this.handleEditTask = this.handleEditTask.bind(this);
    // this.handlelogOut = this.handlelogOut.bind(this);
  }
  handleEditTask() {
    // To show/ hide edit field
    this.setState(prevState => ({
      toggleEditBtn: !prevState.toggleEditBtn
    }));
  }

  handleAddTask(task) {
    console.log(task);
    this.setState({ tasks: [...this.state.tasks, task] });
  }
  async handleDeleteTask(task) {
    const userID = await localStorage.getItem("user");
    const taskID = task._id;

    const response = await axios.delete(`${baseURL}/tasks/${userID}/${taskID}`);
    console.log(response);
    this.props.getTasks();
  }
  //   handlelogOut() {
  //     // console.log(this.props);
  //     this.props.handleLogOut();
  //   }
  async handleChangeDoing(task) {
    // event.preventDefault();
    const taskId = task._id;
    const userId = localStorage.getItem("user");
    const response = await axios.put(`${baseURL}/tasks/${userId}/${taskId}`, {
      description: task.description,
      assigned: "doing"
    });
    console.log(response);
    this.props.getTasks();
  }
  async handleChangeToDo(task) {
    const taskId = task._id;
    const userId = localStorage.getItem("user");
    const response = await axios.put(`${baseURL}/tasks/${userId}/${taskId}`, {
      description: task.description,
      assigned: "todo"
    });
    console.log(response);
    this.props.getTasks();
  }
  async handleChangeDone(task) {
    const taskId = task._id;
    const userId = localStorage.getItem("user");
    const response = await axios.put(`${baseURL}/tasks/${userId}/${taskId}`, {
      description: task.description,
      assigned: "done"
    });
    this.props.getTasks();
  }
  componentDidMount() {
    const tasks = this.props.tasks;
    this.setState({ task: tasks, user: this.props.userid });
  }

  render() {
    return (
      <main>
        {/* <button onClick={this.logOut}>LogOut</button> */}
        <div className="createNewDiv">
          <CreateNew
            user={this.state.user}
            getTasks={this.props.getTasks}
            handleAddTask={this.handleAddTask}
          />
        </div>
        <br />
        <div className="container">
          <div id="ToDoDiv" className="col flex-item">
            <p className="title">TO DO</p>
            {this.props.tasks.map(task => {
              if (task.progress === "todo") {
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
                          {/* Edit Button */}
                          <button
                            typeof="button"
                            className="btn btn-outline-secondary"
                            onClick={() => this.handleEditTask(task)}
                          >
                            ✎
                          </button>{" "}
                          {this.state.toggleEditBtn ? (
                            <EditTask
                              task={task}
                              getTasks={this.props.getTasks}
                            />
                          ) : (
                            <p></p>
                          )}
                          {/* Edit Button */}
                          {/* Buttons */}
                          <div className="moveButtons">
                            <button
                              className="btn btn-outline-secondary"
                              onClick={() => this.handleChangeToDo(task)}
                            >
                              To-Do
                            </button>
                            &nbsp;
                            <button
                              className="btn btn-outline-secondary"
                              onClick={() => this.handleChangeDoing(task)}
                            >
                              Doing
                            </button>
                            &nbsp;
                            <button
                              className="btn btn-outline-secondary"
                              onClick={() => this.handleChangeDone(task)}
                            >
                              Done
                            </button>
                          </div>
                          {/* Buttons */}
                        </div>
                      </li>
                    </ul>
                  </div>
                );
              }
            })}
          </div>
          <div id="DoingDiv" className="col" className="Doing flex-item">
            <p className="title">DOING</p>
            {this.props.tasks.map(task => {
              if (task.progress === "doing") {
                return (
                  <div className="Doing" key={task._id}>
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
                          {/* Edit Button */}
                          <button
                            typeof="button"
                            className="btn btn-outline-secondary"
                            onClick={() => this.handleEditTask(task)}
                          >
                            ✎
                          </button>
                          {this.state.toggleEditBtn ? (
                            <EditTask
                              task={task}
                              getTasks={this.props.getTasks}
                            />
                          ) : (
                            <p></p>
                          )}
                          {/* Edit Button */}
                          {/* Buttons */}
                          <div className="moveButtons">
                            <button
                              className="btn btn-outline-secondary"
                              onClick={() => this.handleChangeToDo(task)}
                            >
                              To-Do
                            </button>
                            &nbsp;
                            <button
                              className="btn btn-outline-secondary"
                              onClick={() => this.handleChangeDoing(task)}
                            >
                              Doing
                            </button>
                            &nbsp;
                            <button
                              className="btn btn-outline-secondary"
                              onClick={() => this.handleChangeDone(task)}
                            >
                              Done
                            </button>
                          </div>
                          {/* Buttons */}
                        </div>
                      </li>
                    </ul>
                  </div>
                );
              }
            })}
          </div>

          <div id="DoneDiv" className="col Done flex-item">
            <p className="title">DONE</p>
            {this.props.tasks.map(task => {
              if (task.progress === "done") {
                return (
                  <div className="Done" key={task._id}>
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
                          {/* Edit Button */}
                          <button
                            typeof="button"
                            className="btn btn-outline-secondary"
                            onClick={() => this.handleEditTask(task)}
                          >
                            ✎
                          </button>
                          {this.state.toggleEditBtn ? (
                            <EditTask
                              task={task}
                              getTasks={this.props.getTasks}
                            />
                          ) : (
                            <p></p>
                          )}
                          {/* Edit Button */}
                          {/* Buttons */}
                          <div className="moveButtons">
                            <button
                              className="btn btn-outline-secondary"
                              onClick={() => this.handleChangeToDo(task)}
                            >
                              To-Do
                            </button>
                            &nbsp;
                            <button
                              className="btn btn-outline-secondary"
                              onClick={() => this.handleChangeDoing(task)}
                            >
                              Doing
                            </button>
                            &nbsp;
                            <button
                              className="btn btn-outline-secondary"
                              onClick={() => this.handleChangeDone(task)}
                            >
                              Done
                            </button>
                          </div>
                          {/* Buttons */}
                        </div>
                      </li>
                    </ul>
                  </div>
                );
              }
            })}
          </div>
          <br />
        </div>
      </main>
    );
  }
}

export default MainContent;
