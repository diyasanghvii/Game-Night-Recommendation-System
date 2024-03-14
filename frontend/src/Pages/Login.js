import React, { useEffect, useState } from "react";
import TextBox from "../Components/TextBox/TextBox";
import { Container, Grid } from "@mui/material";
import Btn from "../Components/Button/Btn";
import Text from "../Components/Typography/Text";
import { Login as loginApi, profileCheck } from "../Services/index";
import ErrorMessage from "../Components/ErrorMessage/ErrorMessage";
import { useNavigate } from "react-router-dom";

const Login = () => {
  let navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const token = sessionStorage.getItem("authToken");
    if (token) {
      profileCheck(token)
        .then(() => {
          navigate("/dashboard");
        })
        .catch(() => {
          sessionStorage.removeItem("authToken");
        });
    }
  });

  const handleLogin = () => {
    // Calling the Login API
    loginApi({ email: username, password })
      .then((response) => {
        if (response.data && response.data.token) {
          sessionStorage.setItem("authToken", response.data.token);
          if (response.data.redirect) {
            // Redirect to the signup page with state
            console.log("fe: redirect");
            navigate('/signup', { state: { stepOneCompleted: response.data.stepOneDone , loggedEmail: response.data.email} });
          } else {
            navigate("/dashboard");
          }
        }
      })
      .catch((error) => {
        sessionStorage.removeItem("authToken");
        if (
          error.response &&
          error.response.data &&
          error.response.data.message
        ) {
          setError(error.response.data.message);
        } else {
          setError(error.response);
        }
      });
  };

  const handleSignUp = () => {
    navigate("/signup");
  };

  return (
    <Container maxWidth="sm">

      <Grid
        container
        justifyContent="space-between"
        alignItems="center"
        marginBottom={2}
      >
        <Text variant="h4" gutterBottom={true} label={"Login"} />
        <Btn label="Sign Up" onClick={handleSignUp} />
      </Grid>
      <TextBox
        label="Email ID"
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
      {error && <ErrorMessage message={error} />}
      <Btn fullWidth={true} label={"Submit"} onClick={handleLogin} />
    </Container>
  );
};

export default Login;
