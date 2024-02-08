import React, { useState } from "react";
import TextBox from "../TextBox/TextBox";
import { Container } from "@mui/material";
import Btn from "../Button/Btn";
import Text from "../Typography/Text";

const SignUp1 = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSignUp = () => {
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    console.log("Username:", username);
    console.log("Email:", email);
    console.log("Password:", password);
    // You can add further logic here to handle sign up process
  };

  return (
    <Container maxWidth="sm">
      <Text variant="h4" gutterBottom={true} label={"Sign Up"} />
 
      <TextBox
        label="Username"
        value={username}
        fullWidth={true}
        onChange={(e) => setUsername(e.target.value)}
      />

      <TextBox
        label="Email"
        type="email"
        value={email}
        fullWidth={true}
        onChange={(e) => setEmail(e.target.value)}
      />

      <TextBox
        label="Password"
        type="password"
        value={password}
        fullWidth={true}
        onChange={(e) => setPassword(e.target.value)}
      />

      <TextBox
        label="Confirm Password"
        type="password"
        value={confirmPassword}
        fullWidth={true}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />

      <Btn fullWidth={true} label={"Sign Up"} onClick={handleSignUp} />
    </Container>
  );
};

export default SignUp1;
