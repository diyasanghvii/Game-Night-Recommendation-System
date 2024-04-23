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
import ErrorMessage from "../Components/ErrorMessage/ErrorMessage";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [error, setError] = useState("");

  useEffect(() => {
    const email = localStorage.getItem("email");
    const token = localStorage.getItem("signUpToken");
    if (email && token) {
      navigate("/login");
    }
  }, [navigate]);

  const handleSignUp = () => {
    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    const data = {
      name: username,
      email: email,
      password: password,
    };

    SignUpOne(data)
      .then((response) => {
        setError(null);
        if (response && response.data) {
          localStorage.setItem("signUpToken", response.data.token);
          localStorage.setItem("email", email);
          navigate("/signupiddetails");
        }
      })
      .catch((error) => {
        setError(error?.response?.data?.message);
      });
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div
      className="all-root"
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "none",
        backgroundColor: "red !important",
        backgroundColor: "rgba(0, 0, 0, 0.4)",
      }}
    >
      <Container
        maxWidth="sm"
        sx={{ background: "rgba(0, 0, 0, 0.4)", padding: 8, borderRadius: 8 }}
      >
        <Text
          variant="h4"
          gutterBottom={true}
          label={"Sign Up"}
          customStyle={{ color: "white", fontSize: "30px" }}
        />
        <Stepper
          sx={{
            marginTop: 5,
            marginBottom: 5,
            "& .MuiStepLabel-root .Mui-completed": {
              color: "green", // Completed steps text color
            },
            "& .MuiStepLabel-label.Mui-completed.MuiStepLabel-alternativeLabel":
              {
                color: "green", // Completed alternative steps text color
              },
            "& .MuiStepLabel-root .Mui-active": {
              color: "white", // Active step text color
            },
            "& .MuiStepLabel-label.Mui-active.MuiStepLabel-alternativeLabel": {
              color: "#ADD8E6", // Active alternative step text color
            },
            "& .MuiStepLabel-root .Mui-active .MuiStepIcon-text": {
              fill: "#0e64ab", // Active step icon color
            },
            "& .MuiStepLabel-root .Mui-disabled": {
              color: "grey", // Incomplete steps text color
            },
          }}
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
          <div style={{ marginBottom: "20px" }}>
            {error && <ErrorMessage message={error} />}
          </div>
          <TextField
            label="Name"
            value={username}
            fullWidth={true}
            onChange={(e) => {
              if (e.target.value.length > 35) {
                setError("Name should be less than 35 character");
              } else {
                setError(null);
                setUsername(e.target.value);
              }
            }}
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
            onChange={(e) => {
              setError(null);
              setPassword(e.target.value);
            }}
            InputLabelProps={{ style: { color: "white" } }}
            InputProps={{
              style: { color: "white" },
              className: "outlined-white-input",
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleTogglePasswordVisibility}>
                    {showPassword ? (
                      <VisibilityOff style={{ color: "white" }} />
                    ) : (
                      <Visibility style={{ color: "white" }} />
                    )}
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
            onChange={(e) => {
              setError(null);
              setConfirmPassword(e.target.value);
            }}
            InputLabelProps={{ style: { color: "white" } }}
            InputProps={{
              style: { color: "white" },
              className: "outlined-white-input",
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleTogglePasswordVisibility}>
                    {showPassword ? (
                      <VisibilityOff style={{ color: "white" }} />
                    ) : (
                      <Visibility style={{ color: "white" }} />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            variant="outlined"
          />
        </div>
        <div style={{ marginTop: 20 }}>
          <Btn fullWidth={true} label={"Sign Up"} onClick={handleSignUp} />
        </div>
      </Container>
    </div>
  );
};

export default SignUp;
