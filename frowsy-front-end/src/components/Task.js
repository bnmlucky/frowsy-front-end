import React, { Component } from "react";
import axios from "axios";
import Update from "../components/Update";

class Task extends Component {
    constructor() {
        super()
        this.state = {
            description: '',
            progress: "todo"
        }
    }
    render() {
        return (
            <div className="task-div">
                <p>Task Text: walk the dog</p>
                <button>Edit</button>
                <button>Delete</button>
            </div>
        )
    }
}
export default Task;