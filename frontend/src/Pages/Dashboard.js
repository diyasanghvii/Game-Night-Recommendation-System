import React, { Component } from "react";
import { profileCheck } from "../Services";

class Dashboard extends Component {
  constructor() {
    super();
    this.state = {
      backendResponse: "",
    };
  }

  componentDidMount = () => {
    const token = sessionStorage.getItem("authToken");
    profileCheck(token)
      .then(() => {})
      .catch(() => {});
  };

  render() {
    return (
      <div>
        <p>DASHBOARD</p>
      </div>
    );
  }
}

export default Dashboard;
