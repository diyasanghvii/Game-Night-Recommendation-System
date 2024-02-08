import React, { useState } from "react";
import TextBox from "../TextBox/TextBox";
import { Container, Grid } from "@mui/material";
import Btn from "../Button/Btn";
import Text from "../Typography/Text";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    console.log("Username:", username);
    console.log("Password:", password);
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
