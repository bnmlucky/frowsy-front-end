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
<<<<<<< HEAD
      toggleEditBtn: false
=======
      toggleEditBtn: false,
      dragid: "",
      dragdescription: ""
>>>>>>> b9d6d118a6c71696ad9c9c055dee2113754d7fad
    };
    this.handleAddTask = this.handleAddTask.bind(this);
    this.handleDeleteTask = this.handleDeleteTask.bind(this);
    this.handleChangeDoing = this.handleChangeDoing.bind(this);
    this.handleChangeToDo = this.handleChangeToDo.bind(this);
    this.handleChangeDone = this.handleChangeDone.bind(this);
    this.handleEditTask = this.handleEditTask.bind(this);
    this.onDragStart = this.onDragStart.bind(this);
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
  //   onDrag = event => {
  //     event.preventDefault();
  //     console.log("dragging");
  //   };
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
  //   handleDrag(event) {
  //     event.preventDefault();
  //     console.log("dragging");
  //   }
  //   handleDrop(event, task) {
  //     console.log(event.currentTarget());
  //     console.log(task);

  //   }
  onDragStart(ev, task) {
    // ev.preventDefault();
    console.log("drag start:" + ev.target.id);
    console.log(task);
    this.setState({
      dragid: task._id,
      dragdescription: task.description
    });
    // console.log(ev.currentTarget());
  }
  onDragOver(ev) {
    ev.preventDefault();
  }
  async onDrop(ev, cat) {
    const taskId = this.state.dragid;
    const userId = localStorage.getItem("user");

    const response = await axios.put(`${baseURL}/tasks/${userId}/${taskId}`, {
      description: this.state.dragdescription,
      assigned: cat
    });

    this.setState({
      dragid: "",
      dragdescription: ""
    });
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
            onDrop={e => {
              this.onDrop(e, "todo");
            }}
            // onDrop={event => this.handleDrop(event)}
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
                    // onDrag={(event, task) => this.handleDrag(event, task)}
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
          <div
            id="DoingDiv"
            className="col"
            className="Doing flex-item"
            onDragOver={e => this.onDragOver(e)}
            onDrop={e => {
              this.onDrop(e, "doing");
            }}
            // onDrop={(event, task) => this.handleDrop(event, task)}
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
                    // onDrag={event => this.onDrag(event, task)}
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

          <div
            id="DoneDiv"
            className="col Done flex-item"
            onDragOver={event => event.preventDefault()}
            onDrop={e => {
              this.onDrop(e, "done");
            }}
            // onDrop={(event, task) => this.handleDrop(event, task)}
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
                    // onDrag={event => this.onDrag(event, task)}
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
