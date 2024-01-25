import React, { Component } from "react";
import Btn from "../Components/Button/Btn";
import TextBox from "../Components/TextBox/TextBox";

class Home extends Component {
  constructor() {
    super();
    this.state = {
      // State variables here
    };
  }
  render() {
    return (
      <div>
        <h1>Game-Night-Recommendation-System</h1>
        <Btn
          label={"Material UI Button"}
          onClick={() => {
            alert("Button Clicked");
          }}
        />
        <TextBox label={"Sample text box"} />
      </div>
    );
  }
}

export default Home;
