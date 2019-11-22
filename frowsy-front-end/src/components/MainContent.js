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
    }

    componentDidMount() {
        const tasks = this.props.tasks;
        this.setState({ task: tasks, user: this.props.userid });
    }

    render() {
        return (
            <main>
                To Do:
                {this.props.tasks.map(task => {
                    return (
                        <div className="ToDo" key={task._id}>
                            <ul>
                                <li>
                                    test1
                                        {task.description}
                                </li>
                            </ul>
                        </div>
                    )
                }
                )}
                <div className="Doing">Doing:</div>
                <div className="Done">Done:</div>
                <br />
                <CreateNew user={this.state.user} getTasks={this.props.getTasks} />
            </main >
        );
    }
}

export default MainContent;
