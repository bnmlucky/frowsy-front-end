import React, { Component } from "react";
import axios from "axios";
import CreateNew from "../components/CreateNew";
import Update from "../components/Update";
import Task from './Task.js'

class MainContent extends Component {
    constructor() {
        super()
        this.state = {

        }
    }

    render() {
        return (
            <div className="mainContent-main-div">
                <h1>Frowsy</h1>
                <h2>Main Content is here</h2>
                <div className="ToDo">To Do:
            <Task />
                </div>
                <div className="Doing">Doing:</div>
                <div className="Done">Done:</div>
                <br />
                <CreateNew />
            </div>
        );
    }
}

export default MainContent;