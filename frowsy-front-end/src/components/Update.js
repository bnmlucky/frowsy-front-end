import React, { Component } from 'react';
import axios from 'axios';

class Update extends Component {
    constructor() {
        super();
        this.state = {
            task: ''
        }
        //bind statements
        //this.handleOnChange = this.handleOnChange.bind(this);
        //this.handleUpdateSubmit = this.handleEditSubmit.bind(this);
    }
    componentDitMount() {
        console.log('Update Form Mounted');
        this.setState({
            task: this.props.task
        });
    }

    handleOnChange(event) {
        const { name, value } = event.target; //should be a {task, value}
        this.setState({
            [name]: value
        })
    }

    // async handleUpdateSubmit(event)

    render() {
        return (
            <div>
                <h1>Hello</h1>
            </div>
        )
    }
}

export default Update;