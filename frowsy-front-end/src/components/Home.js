import React, { Component } from "react";

class Home extends Component {
  render() {
    return (
      <div className="home">

        <h1 className="bold">
          {" "}
          FROWSY lets you work more efficiently and get more done.
          </h1>

        <div className="container">

          <img className="" src="blankpost-its.jpg" alt="sticky notes"></img>

          <p className="flex-item home-text">
            {" "}
            <p className="">Say no to sticky notes everywhere.</p>

            {" "}
            Frowsy’s boards and lists enable you to organize and prioritize your
            projects in a fun, flexible, and rewarding way.
          </p>

        </div>

      </div >
    );
  }
}
export default Home;
