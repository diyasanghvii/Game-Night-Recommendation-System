import React, { useState } from "react";
import {
  Container,
  IconButton,
  TextField,
  InputAdornment,
} from "@mui/material";
import Btn from "../Button/Btn";
import Text from "../Typography/Text";
import { SignUpOne } from "../../Services";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Stepper, Step, StepLabel } from "@mui/material";

const SignUp1 = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

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
          localStorage.setItem("signUpToken", response.data.token);
          localStorage.setItem("email", email);
          navigate("/signupiddetails");
        }
      })
      .catch((error) => {
        alert(error?.response?.data?.message);
      });
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div
      style={{
        backgroundImage: "url('/images/Game Image2.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
      }}
    >
      <Container maxWidth="sm">
        <Text variant="h4" gutterBottom={true} label={"Sign Up"} />
        <Stepper activeStep={0} alternativeLabel>
          <Step key={0}>
            <StepLabel>Step 1</StepLabel>
          </Step>
          <Step key={1}>
            <StepLabel>Step 2</StepLabel>
          </Step>
          <Step key={2}>
            <StepLabel>Step 3</StepLabel>
          </Step>
        </Stepper>

        <div style={{ marginBottom: "16px" }}>
          <TextField
            label="Name"
            value={username}
            fullWidth={true}
            onChange={(e) => setUsername(e.target.value)}
            variant="outlined" // Set variant to "outlined"
            sx={{ "& .MuiOutlinedInput-root": { borderColor: "white" } }} // Customize outline color
          />
        </div>

        <div style={{ marginBottom: "16px" }}>
          <TextField
            label="Email"
            type="email"
            value={email}
            fullWidth={true}
            onChange={(e) => setEmail(e.target.value)}
            variant="outlined" // Set variant to "outlined"
            sx={{ "& .MuiOutlinedInput-root": { borderColor: "white" } }} // Customize outline color
          />
        </div>

        <div style={{ marginBottom: "16px" }}>
          <TextField
            label="Password"
            type={showPassword ? "text" : "password"}
            value={password}
            fullWidth={true}
            onChange={(e) => setPassword(e.target.value)}
            variant="outlined" // Set variant to "outlined"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleTogglePasswordVisibility}>
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={{ "& .MuiOutlinedInput-root": { borderColor: "white" } }} // Customize outline color
          />
        </div>

        <div style={{ marginBottom: "16px" }}>
          <TextField
            label="Confirm Password"
            type={showPassword ? "text" : "password"}
            value={confirmPassword}
            fullWidth={true}
            onChange={(e) => setConfirmPassword(e.target.value)}
            variant="outlined" // Set variant to "outlined"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleTogglePasswordVisibility}>
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={{ "& .MuiOutlinedInput-root": { borderColor: "white" } }} // Customize outline color
          />
        </div>

        <Btn fullWidth={true} label={"Sign Up"} onClick={handleSignUp} />
      </Container>
    </div>
  );
};

export default SignUp1;
