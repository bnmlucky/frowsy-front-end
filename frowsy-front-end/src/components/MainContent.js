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
      toggleEditBtn: false,
      editId: "",
      dragid: "",
      dragdescription: ""
    };
    this.handleAddTask = this.handleAddTask.bind(this);
    this.handleDeleteTask = this.handleDeleteTask.bind(this);
    this.handleChangeDoing = this.handleChangeDoing.bind(this);
    this.handleChangeToDo = this.handleChangeToDo.bind(this);
    this.handleChangeDone = this.handleChangeDone.bind(this);
    this.handleEditTask = this.handleEditTask.bind(this);
    this.onDragStart = this.onDragStart.bind(this);
    this.editDone = this.editDone.bind(this);
  }
  handleEditTask(id) {
    // To show/ hide edit field
    // this.setState(prevState => ({
    //   toggleEditBtn: !prevState.toggleEditBtn
    // }));
    this.setState({
      editId: id
    });
  }

  handleAddTask(task) {
    this.setState({ tasks: [...this.state.tasks, task] });
  }

  async handleDeleteTask(task) {
    const userID = await localStorage.getItem("user");
    const taskID = task._id;

    const response = await axios.delete(`${baseURL}/tasks/${userID}/${taskID}`);

    this.props.getTasks();
  }

  async handleChangeDoing(task) {
    const taskId = task._id;
    const userId = localStorage.getItem("user");
    const response = await axios.put(`${baseURL}/tasks/${userId}/${taskId}`, {
      description: task.description,
      assigned: "doing"
    });

    this.props.getTasks();
  }
  async handleChangeToDo(task) {
    const taskId = task._id;
    const userId = localStorage.getItem("user");
    const response = await axios.put(`${baseURL}/tasks/${userId}/${taskId}`, {
      description: task.description,
      assigned: "todo"
    });

    this.props.getTasks();
  }

  onDragStart(ev, task) {
    this.setState({
      dragid: task._id,
      dragdescription: task.description
    });
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
  editDone() {
    this.setState({
      editId: ""
    });
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
                            onClick={() => this.handleEditTask(task._id)}
                          >
                            ✎
                          </button>{" "}
                          {this.state.editId === task._id ? (
                            <EditTask
                              task={task}
                              getTasks={this.props.getTasks}
                              editDone={this.editDone}
                            />
                          ) : (
                            <p></p>
                          )}
                          {/* Edit Button */}
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
                            onClick={() => this.handleEditTask(task._id)}
                          >
                            ✎
                          </button>
                          {this.state.editId === task._id ? (
                            <EditTask
                              task={task}
                              getTasks={this.props.getTasks}
                              editDone={this.editDone}
                            />
                          ) : (
                            <p></p>
                          )}
                          {/* Edit Button */}
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
                            onClick={() => this.handleEditTask(task._id)}
                          >
                            ✎
                          </button>
                          {this.state.editId === task._id ? (
                            <EditTask
                              task={task}
                              getTasks={this.props.getTasks}
                              editDone={this.editDone}
                            />
                          ) : (
                            <p></p>
                          )}
                          {/* Edit Button */}
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
