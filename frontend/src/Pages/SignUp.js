import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SignUp1 from "../Components/Signup1/Signup1";
import Signup2 from "../Components/Signup2/Signup2";


const SignUp = () => {
  let navigate = useNavigate();

  useEffect(() => {
    var storedAuthToken = sessionStorage.getItem("authToken");
    if (storedAuthToken) {
      navigate("/dashboard");
    }
  }, []);

  return (
    <div>
      <h1>Sign Up Page</h1>
      <h3>Add Your Signup Page Here</h3>
      <SignUp1 />
      <Signup2 />
    </div>
  );
};

export default SignUp;
