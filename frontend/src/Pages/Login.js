import React, { useEffect, useState } from "react";
import TextBox from "../Components/TextBox/TextBox";
import { Container, Grid } from "@mui/material";
import Btn from "../Components/Button/Btn";
import Text from "../Components/Typography/Text";
import { Login as loginApi } from "../Services/index";
import ErrorMessage from "../Components/ErrorMessage/ErrorMessage";
import { useNavigate } from "react-router-dom";

const Login = () => {
  let navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    var storedAuthToken = sessionStorage.getItem("authToken");
    if (storedAuthToken) {
      // navigate("/dashboard");
    }
  }, []);

  const handleLogin = () => {
    // Calling the Login API
    loginApi({ email: username, password })
      .then((response) => {
        sessionStorage.setItem("authToken", "Success");
        // navigate("/dashboard");
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
    // navigate("/signup");
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
      {error && <ErrorMessage message={error} />}
      <Btn fullWidth={true} label={"Submit"} onClick={handleLogin} />
    </Container>
  );
};

export default Login;
