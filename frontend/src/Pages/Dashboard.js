import React, { Component } from "react";

class Dashboard extends Component {
  constructor() {
    super();
    this.state = {
      // State variables here
      backendResponse: "",
    };
  }

  render() {
    const { backendResponse } = this.state;
    return (
      <div>Dashboard
      </div>
    );
  }
}

export default Dashboard;
