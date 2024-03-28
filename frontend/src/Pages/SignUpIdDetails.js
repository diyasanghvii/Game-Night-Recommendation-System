import React, { useState, useEffect } from "react";
import TextBox from "../Components/TextBox/TextBox";
import { Container } from "@mui/material";
import Text from "../Components/Typography/Text";
import ErrorMessage from "../Components/ErrorMessage/ErrorMessage";
import { SignUpTwo, VerifyUserSteamId } from "../Services";
import Btn from "../Components/Button/Btn";
import { isValidDiscordUsername } from "../Utils";
import { useNavigate } from "react-router-dom";
import { Stepper, Step, StepLabel } from "@mui/material";

const SignUpIdDetails = () => {
  const [steamId, setSteamId] = useState("");
  const [discordUserName, setdiscordUserName] = useState("");
  const [steamIdVerified, setSteamIdVerified] = useState(false);
  const [discordUserNameVerified, setdiscordUserNameVerified] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [warning, setWarning] = useState("");
  const [edited, setEdited] = useState(false);



  useEffect(() => {
    if (steamIdVerified && discordUserNameVerified) {
      setWarning("");
    }
  }, [steamIdVerified, discordUserNameVerified]);

  const handleVerifySteamId = () => {
    if (!steamId) {
      setError("Please provide your Steam ID.");
      return;
    }
    if (edited) {
      setError("");
    }

    // Call Steam API here
    VerifyUserSteamId(steamId)
      .then((res) => {
        if (res && res.data && res.data.status) {
          setSteamIdVerified(true);
          setError("");
        }
      })
      .catch((e) => {
        setError("Invalid Steam ID.");
        setSteamIdVerified(false);
      });
  };

  const handleVerifydiscordUserName = () => {
    if (!discordUserName) {
      setError("Please provide your Discord Username.");
      return;
    }
    if (edited) {
      setError("");
    }

    if (isValidDiscordUsername(discordUserName)) {
      setdiscordUserNameVerified(true);
      setError("");
    } else {
      setError("Invalid Discord User Name.");
      setdiscordUserNameVerified(false);
    }
  };

  const handleSignup = () => {
    const email = localStorage.getItem("email");
    const data = {
      email: email,
      steamId: steamId,
      discordUserName: discordUserName,
    };

    SignUpTwo(data)
      .then((response) => {
        if (response && response.data) {
          navigate("/signupgamedetails", { state: { signUpTwoDone: true } });
        }
      })
      .catch((error) => {
        alert(error?.response?.data?.message);
      });
  };
  
  const handleFieldChange = () => {
    if (!edited) {
      setEdited(true);
    }
  };

  return (
    <Container maxWidth="sm">
      <Text variant="h4" gutterBottom={true} label={"Signup"} />
      <Stepper
        sx={{ marginTop: 5, marginBottom: 5 }}
        activeStep={1}
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
      {error && <ErrorMessage message={error} />}
      {warning && <ErrorMessage message={warning} />}

      <div
        style={{
          maxWidth: "700px",
          margin: "auto",
          marginTop: "20px",
          display: "flex",
          flexDirection: "column",
          rowGap: "10px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <TextBox
            label="Steam ID"
            value={steamId}
            fullWidth={true}
            type="number"
            style={{ width: "80%" }}
            onChange={(e) => {
              setSteamId(e.target.value);
              setSteamIdVerified(false);
              handleFieldChange();
            }}
          />
          {steamIdVerified ? (
            <span style={{ color: "green", fontSize: "1.5em" }}>&#10004;</span>
          ) : (
            <span style={{ color: "red", fontSize: "1.5em" }}>&#10006;</span>
          )}
          <Btn
            label="Verify"
            disabled={steamIdVerified}
            style={{ width: "5%" }}
            onClick={handleVerifySteamId}
          />
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <TextBox
            label="Discord Username"
            value={discordUserName}
            fullWidth={true}
            style={{ width: "80%" }}
            onChange={(e) => {
              setdiscordUserName(e.target.value);
              setdiscordUserNameVerified(false);
              handleFieldChange();
            }}
          />
          {discordUserNameVerified ? (
            <span style={{ color: "green", fontSize: "1.5em" }}>&#10004;</span>
          ) : (
            <span style={{ color: "red", fontSize: "1.5em" }}>&#10006;</span>
          )}
          <Btn
            label="Verify"
            disabled={discordUserNameVerified}
            style={{ width: "5%" }}
            onClick={handleVerifydiscordUserName}
          />
        </div>
      </div>
      <button
        style={{
          backgroundColor:
            steamIdVerified && discordUserNameVerified ? "#1976d2" : "#b3e5fc",
          color: "#fff",
          width: "100%",
          borderRadius: "4px",
          padding: "10px 20px",
          fontSize: "16px",
          border: "none",
          cursor: "pointer",
          transition: "background-color 0.3s ease, filter 0.3s ease",
          filter:
            steamIdVerified && discordUserNameVerified
              ? "brightness(1)"
              : "brightness(0.8)",
        }}
        onClick={handleSignup}
        disabled={!steamIdVerified || !discordUserNameVerified}
      >
        Continue
      </button>
    </Container>
  );
};

export default SignUpIdDetails;