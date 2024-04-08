import React, { useEffect, useState } from "react";
import {
  Container,
  TextField,
  InputAdornment,
  IconButton,
} from "@mui/material";
import Btn from "../Components/Button/Btn";
import Text from "../Components/Typography/Text";
import { SignUpOne } from "../Services";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Stepper, Step, StepLabel } from "@mui/material";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const email = localStorage.getItem("email");
    const token = localStorage.getItem("signUpToken");
    if (email && token) {
      navigate("/login");
    }
  }, [navigate]);

  const handleSignUp = () => {
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

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
        backgroundImage: "url('/images/Game Image.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
      }}
    >
      <Container maxWidth="sm">
        <Text
          variant="h4"
          gutterBottom={true}
          label={"Sign Up"}
          sx={{ color: "white" }}
        />
        <Stepper
          sx={{ marginTop: 5, marginBottom: 5 }}
          activeStep={0}
          alternativeLabel
        >
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
            InputLabelProps={{ style: { color: "white" } }}
            InputProps={{
              style: { color: "white" },
              className: "outlined-white-input",
            }}
            variant="outlined"
          />
        </div>

        <div style={{ marginBottom: "16px" }}>
          <TextField
            label="Email"
            type="email"
            value={email}
            fullWidth={true}
            onChange={(e) => setEmail(e.target.value)}
            InputLabelProps={{ style: { color: "white" } }}
            InputProps={{
              style: { color: "white" },
              className: "outlined-white-input",
            }}
            variant="outlined"
          />
        </div>

        <div style={{ marginBottom: "16px" }}>
          <TextField
            label="Password"
            type={showPassword ? "text" : "password"}
            value={password}
            fullWidth={true}
            onChange={(e) => setPassword(e.target.value)}
            InputLabelProps={{ style: { color: "white" } }}
            InputProps={{
              style: { color: "white" },
              className: "outlined-white-input",
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleTogglePasswordVisibility}>
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            variant="outlined"
          />
        </div>

        <div style={{ marginBottom: "16px" }}>
          <TextField
            label="Confirm Password"
            type={showPassword ? "text" : "password"}
            value={confirmPassword}
            fullWidth={true}
            onChange={(e) => setConfirmPassword(e.target.value)}
            InputLabelProps={{ style: { color: "white" } }}
            InputProps={{
              style: { color: "white" },
              className: "outlined-white-input",
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleTogglePasswordVisibility}>
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            variant="outlined"
          />
        </div>

        <Btn fullWidth={true} label={"Sign Up"} onClick={handleSignUp} />
      </Container>
    </div>
  );
};

export default SignUp;
