import React, { Component } from "react";

class Dashboard extends Component {
  constructor() {
    super();
    this.state = {
<<<<<<< HEAD
=======
      // State variables here
>>>>>>> 6f1c73a45b1157e30b224ea25bc202cec9c6116a
      backendResponse: "",
    };
  }

  render() {
<<<<<<< HEAD
    return (
      <div>
        <p>DASHBOARD</p>
=======
    const { backendResponse } = this.state;
    return (
      <div>Dashboard
>>>>>>> 6f1c73a45b1157e30b224ea25bc202cec9c6116a
      </div>
    );
  }
}

export default Dashboard;
