import React, { Component } from 'react';
import CreateNew from './CreateNew';
import Update from './Update';
import axios from 'axios';

class MainContent extends Component {
    constructor() {
        super()
        this.state = {

        }
    }
    render() {
        return (
            <div className="mainContent-main-div">
                <h2>Main Content is here</h2>
            </div>
        )
    }
}
export default MainContent;