import React, { useState } from "react";
import TextBox from "../TextBox/TextBox";
import { Container } from "@mui/material";
import Btn from "../Button/Btn";
import Text from "../Typography/Text";
import { SignUpOne } from "../../Services";

const SignUp1 = ({ stepOneDone }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSignUp = () => {
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    // Prepare data object in JSON format
    const data = {
      name: username,
      email: email,
      password: password,
    };

    SignUpOne(data)
      .then((response) => {
        if (response && response.data) {
          sessionStorage.setItem("authToken", response.data.token);
          stepOneDone(email);
        }
      })
      .catch((error) => {
        alert(error?.response?.data?.message);
      });
  };

  return (
    <Container maxWidth="sm">
      <Text variant="h4" gutterBottom={true} label={"Sign Up"} />

      <TextBox
        label="Name"
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
