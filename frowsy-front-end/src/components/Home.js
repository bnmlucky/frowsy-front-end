import React, { Component } from "react";

class Home extends Component {
  render() {
    return (
      <div className="home">
        <p className=" mx-auto w-75">
          <h1 className="bold">
            {" "}
            FROWSY lets you work more efficiently and get more done.
          </h1>
          <span className=" w-50">
            {" "}
            Frowsy’s boards and lists enable you to organize and prioritize your
            projects in a fun, flexible, and rewarding way.
          </span>
        </p>
      </div>
    );
  }
}
export default Home;
