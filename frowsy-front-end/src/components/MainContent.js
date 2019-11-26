import React, { Component } from "react";
import axios from "axios";
import CreateNew from "../components/CreateNew";
import EditTask from "./EditTask.js";
import { DragDropContext } from "react-beautiful-dnd";
const baseURL = "http://localhost:3003";
class MainContent extends Component {
  constructor() {
    super();
    this.state = {
      user: "",
      loggedIn: true,
      tasks: [],
      dragging: "",
      toggleEditBtn: false
    };
    this.handleAddTask = this.handleAddTask.bind(this);
    this.handleDeleteTask = this.handleDeleteTask.bind(this);
    this.handleEditTask = this.handleEditTask.bind(this);
    this.handleChangeDoing = this.handleChangeDoing.bind(this);
    this.handleChangeToDo = this.handleChangeToDo.bind(this);
    this.handleChangeDone = this.handleChangeDone.bind(this);
    // this.handlelogOut = this.handlelogOut.bind(this);
  }
  handleAddTask(task) {
    console.log(task);
    this.setState({ tasks: [...this.state.tasks, task] });
  }
  handleEditTask() {
    this.setState(prevState => ({
      toggleEditBtn: !prevState.toggleEditBtn
    }));
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
  onDragOver(ev) {
    ev.preventDefault();
    // console.log(ev);
  }
  onDragStart(ev, id) {
    console.log(id);
    ev.dataTransfer.setData("text/plain", id);
  }
  onDrop(ev, cat) {
    console.log(ev, cat);
    const id = ev.dataTransfer.getData("text");
    console.log("this is id" + id._id);
  }
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
          <div
            id="ToDoDiv"
            className="col flex-item"
            onDragOver={e => this.onDragOver(e)}
            onDrop={e => this.onDrop(e, "todo")}
          >
            <p className="title">TO DO</p>
            {this.props.tasks.map(task => {
              if (task.progress === "todo") {
                return (
                  <div
                    className="ToDo"
                    key={task._id}
                    onDragStart={e => this.onDragStart(e, task)}
                    draggable
                  >
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
                        &nbsp;
                        {/* <EditTask task={task} getTasks={this.props.getTasks} />
                        <button onClick={() => this.handleChangeDoing(task)}> */}
                        {/* </button> */}
                      </li>
                    </ul>
                  </div>
                );
              }
            })}
          </div>
          <div
            id="DoingDiv"
            className="col"
            className="Doing flex-item"
            onDragOver={e => this.onDragOver(e)}
            onDrop={e => this.onDrop(e, "doing")}
          >
            <p className="title">DOING</p>
            {this.props.tasks.map(task => {
              if (task.progress === "doing") {
                return (
                  <div
                    className="Doing"
                    key={task._id}
                    onDragStart={e => this.onDragStart(e, task)}
                    draggable
                  >
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
                        </div>
                        &nbsp;{" "}
                        <button onClick={() => this.handleChangeToDo(task)}>
                          To-Do
                        </button>
                        <button onClick={() => this.handleChangeDone(task)}>
                          Done
                        </button>
                      </li>
                    </ul>
                  </div>
                );
              }
            })}
          </div>

          <div
            id="DoneDiv"
            className="col Done flex-item"
            onDragOver={e => this.onDragOver(e)}
            onDrop={e => this.onDrop(e, "done")}
          >
            <p className="title">DONE</p>
            {this.props.tasks.map(task => {
              if (task.progress === "done") {
                return (
                  <div
                    className="Done"
                    key={task._id}
                    onDragStart={e => this.onDragStart(e, task)}
                    draggable
                  >
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
                        </div>
                        &nbsp;
                        <button onClick={() => this.handleChangeDoing(task)}>
                          Doing
                        </button>
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
