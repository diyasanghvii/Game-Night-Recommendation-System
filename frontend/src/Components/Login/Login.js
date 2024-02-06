import React, { useState } from "react";
import TextBox from "../TextBox/TextBox";
import { Container } from "@mui/material";
import Btn from "../Button/Btn";
import Text from "../Typography/Text";
import { Login as loginApi } from "../../Services/index";
import Dashboard from "../../Pages/Dashboard";
import ErrorMessage from "../ErrorMessage/ErrorMessage";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [redirectToHome, setRedirectToHome] = useState(false);

  const handleLogin = () => {
    console.log("Username:", username);

    // Calling the Login API
    loginApi({ email: username, password })
      .then((response) => {
        console.log("Login successful!", response);
        setRedirectToHome(true);
      })
      .catch((error) => {
        console.error("Login failed:", error);

        if (error.response && error.response.data && error.response.data.message) {
          setError(error.response.data.message);
        } else {
          setError(error.response);
        }
      });
  };

  if (redirectToHome) {
    return <Dashboard/>;
  }
  return (
    <Container maxWidth="sm">
      <Text variant="h4" gutterBottom={true} label={"Login"} />
 
      {error && <ErrorMessage message={error} />}

      <TextBox
        label="Username"
        value={username}
        fullWidth={true}
        onChange={(e) => setUsername(e.target.value)}
      />

      <TextBox
        label="Password"
        type="password"
        value={password}
        fullWidth={true}
        onChange={(e) => setPassword(e.target.value)}
      />

      <Btn fullWidth={true} label={"Submit"} onClick={handleLogin} />
    </Container>
  );
};

export default Login;