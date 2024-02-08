import React, { Component } from "react";
import Btn from "../Components/Button/Btn";
import TextBox from "../Components/TextBox/TextBox";
import { getTestData } from "../Services";
import Login from "../Components/Login/Login";
import Signup1 from "../Components/Signup1/Signup1"
class Home extends Component {
  constructor() {
    super();
    this.state = {
      // State variables here
      backendResponse: "",
    };
  }

  componentDidMount = () => {
    this.callTestAPI();
  };

  callTestAPI = async () => {
    try {
      const res = await getTestData();
      this.setState({ backendResponse: res.data });
    } catch (error) {
      this.setState({ backendResponse: error });
    }
  };

  render() {
    const { backendResponse } = this.state;
    return (
      <div>
        {/* <h1>Game-Night-Recommendation-System</h1>
        <Btn
          label={"Material UI Button"}
          onClick={() => {
            alert("Button Clicked");
          }}
        />
        <TextBox label={"Sample text box"} />
        {backendResponse !== "" && (
          <p>Response from backend : {backendResponse.message}</p>
        )}
         */} 
         {/*<Login/>*/}
         <Signup1/>
      </div>

    );
  }
}

export default Home;
