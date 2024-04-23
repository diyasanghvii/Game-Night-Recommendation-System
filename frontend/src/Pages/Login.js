import React, { useEffect, useState } from "react";
import TextBox from "../Components/TextBox/TextBox";
import {
  Container,
  IconButton,
  InputAdornment,
  TextField,
  Box,
  Divider,
} from "@mui/material";
import Btn from "../Components/Button/Btn";
import Text from "../Components/Typography/Text";
import {
  CacheUserSteamGames,
  Login as loginApi,
  profileCheck,
} from "../Services/index";
import ErrorMessage from "../Components/ErrorMessage/ErrorMessage";
import { useNavigate } from "react-router-dom";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const Login = () => {
  let navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    localStorage.clear();
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
  }, []);

  const cacheUserSteamData = () => {
    CacheUserSteamGames()
      .then((response) => {
        if (response) {
          navigate("/dashboard");
        }
      })
      .catch((error) => {
        alert("Error Logging in. Please try again!");
        console.log("Error: ", error);
      });
  };

  const handleLogin = () => {
    // Calling the Login API
    loginApi({ email: username, password })
      .then((response) => {
        if (response.data && response.data.token) {
          if (response.data.redirect) {
            localStorage.setItem("signUpToken", response.data.token);
            localStorage.setItem("email", response.data.email);
            if (response.data.initialStep === 1) {
              navigate("/signupiddetails");
            } else if (response.data.initialStep === 2) {
              navigate("/signupgamedetails");
            }
          } else {
            sessionStorage.setItem("authToken", response.data.token);
            cacheUserSteamData();
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

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div
      className="all-root"
      style={{
        display: "flex",
        backgroundColor: "rgba(0, 0, 0, 0.4)",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <Container
        maxWidth="sm"
        sx={{ background: "rgba(0, 0, 0, 0.4)", padding: 8, borderRadius: 8 }}
      >
        <Box display="flex" justifyContent="space-between" alignItems="center">
          {/* Apply the color style directly to the Text component */}
          <Text
            variant="p"
            gutterBottom={true}
            label={"Log in to your account"}
            customStyle={{ color: "white", fontSize: "1.5rem" }} // Change text color to white
          />
        </Box>
        <TextBox
          label="Email ID"
          value={username}
          fullWidth={true}
          onChange={(e) => setUsername(e.target.value)}
          variant="outlined"
          color="primary" // Change color to primary (blue)
          sx={{
            marginBottom: "8px",
            "& input": { color: "white" }, // Change input text color to white
          }}
        />
        <div style={{ marginTop: 20 }}>
          <TextField
            label="Password"
            type={showPassword ? "text" : "password"}
            value={password}
            fullWidth={true}
            onChange={(e) => setPassword(e.target.value)}
            variant="outlined"
            color="primary" // Change color to primary (blue)
            sx={{
              "& input": { color: "white" }, // Change input text color to white
              marginBottom: "16px",
              "& input": { color: "white" },
              color: "white", // Change text color to white
              backgroundColor: "transparent", // Keep background transparent
              "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
                borderColor: "white", // Change border color to white
              },
              "& .MuiFormLabel-root": {
                color: "white !important", // Change label color to white
              },
              "& .MuiInputLabel-outlined": {
                color: "white", // Change label color to white
              },
              "& .MuiOutlinedInput-input": {
                color: "white", // Change input text color to white
              },
              "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline":
                {
                  borderColor: "white", // Change border color on hover to white
                },
              "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                {
                  borderColor: "white", // Change border color on focus to white
                },
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="Toggle password visibility"
                    onClick={handleTogglePasswordVisibility}
                    sx={{ color: "white" }} // Change icon color to white
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </div>

        {error && <ErrorMessage message={error} />}
        <div style={{ marginTop: 10 }}>
          <Btn
            fullWidth={true}
            label={"Log In"}
            onClick={handleLogin}
            color="success"
            sx={{ backgroundColor: "green" }}
          />
        </div>
        <div style={{ marginTop: 30 }}>
          <Btn
            fullWidth={true}
            label={"Don't have an account? Sign Up"}
            onClick={handleSignUp}
            color="success"
            sx={{ backgroundColor: "green" }}
          />
        </div>
      </Container>
    </div>
  );
};

export default Login;
