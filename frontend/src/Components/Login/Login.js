import React, { useState } from "react";
import TextBox from "../TextBox/TextBox";
import { Container } from "@mui/material";
import Btn from "../Button/Btn";
import Text from "../Typography/Text";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    console.log("Username:", username);
    console.log("Password:", password);
  };

  return (
    <Container maxWidth="sm">
      <Text variant="h4" gutterBottom={true} label={"Login"} />
 
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