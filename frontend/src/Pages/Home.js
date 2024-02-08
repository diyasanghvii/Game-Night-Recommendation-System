import React, { Component } from "react";
import Btn from "../Components/Button/Btn";
import TextBox from "../Components/TextBox/TextBox";
import { getTestData } from "../Services";
import Login from "../Components/Login/Login";
import Signup2 from "../Components/Signup2/Signup2";

class Home extends Component {
  constructor() {
    super();
    this.state = {
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
      <div style={{ backgroundColor: "#f0f0f0", textAlign: "center", padding: "50px", height: "100vh", position: "relative" }}>
        <div style={{ backgroundColor: "lightblue", padding: "10px", marginBottom: "20px" }}>
          <h1 style={{ margin: 0, fontFamily: 'Sharp Sans, sans-serif' }}>Game Night Recommender</h1>
        </div>
        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", backgroundColor: "white", textAlign: "center", padding: "10px", width: "80vh", height: "50vh" }}>
          <Login /> 
        </div>
      </div> 
   /*<Signup2/>*/
    );
  }
}

export default Home;
