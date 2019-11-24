import React, { Component } from "react";
import axios from "axios";
import CreateNew from "../components/CreateNew";
import Update from "../components/Update";
import Task from "./Task.js";

class MainContent extends Component {
    constructor() {
        super();
        this.state = {
            user: "",
            loggedIn: true,
            tasks: []
        };
        this.handleAddTask = this.handleAddTask.bind(this)
    }
    handleAddTask(task) {
        console.log(task)
        this.setState({ tasks: [...this.state.tasks, task] })

    }
    componentDidMount() {
        const tasks = this.props.tasks;
        this.setState({ task: tasks, user: this.props.userid });
    }

    render() {
        return (
            <main>
                <CreateNew user={this.state.user} getTasks={this.props.getTasks} handleAddTask={this.handleAddTask} />
                <br />
                <div className="container">
                    To Do:
                {this.props.tasks.map(task => {
                        return (
                            <div className="ToDo" key={task._id}>
                                <ul>
                                    <li>
                                        {task.description} &nbsp;
                                     <button>&#128465;</button> &nbsp;
                                     <button>✎</button> &nbsp;
                             </li>
                                </ul>
                            </div>
                        )
                    }
                    )}
                    <div className="Doing">Doing:</div>
                    <div className="Done">Done:</div>
                    <br />
                </div>
            </main >
        );
    }
}

export default MainContent;
