import React, { Component } from "react";
import "./App.css";
import CreateNew from "./components/CreateNew";
import MainContent from "./components/MainContent";
import Update from "./components/Update";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //PROPERTIES FROM THE SCHEMS?
    };
    //BINDING STATEMENTS
  }
  componentDidMount() {
    //WE WILL HAVE A CALL FROM THE BACK-END
  }
  //ASYNC CALLS --

  //RENDER/RETURN
  render() {
    return (
      <div>
        <MainContent />
        <CreateNew />
        <Update />
      </div>
    );
  }
}

export default App;
