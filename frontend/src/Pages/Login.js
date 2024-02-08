import React, { useState } from "react";
import TextBox from "../Components/TextBox/TextBox";
import { Container } from "@mui/material";
import Btn from "../Components/Button/Btn";
import Text from "../Components/Typography/Text";
import { Login as loginApi } from "../Services/index";
import ErrorMessage from "../Components/ErrorMessage/ErrorMessage";

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

  const handleSignUp = () => {
    // Handle SignUp action here, navigate to SignUp page or show SignUp form
    console.log("Navigate to SignUp page or show SignUp form");
  };

  return (
    <Container maxWidth="sm">
      <Grid container justifyContent="space-between" alignItems="center" marginBottom={2}>
        <Text variant="h4" gutterBottom={true} label={"Login"} />
        <Btn label="Sign Up" onClick={handleSignUp} />
      </Grid>
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
