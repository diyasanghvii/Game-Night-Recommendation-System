import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

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
    </div>
  );
};

export default SignUp;
