import React, { useState, useEffect } from "react";
import TextBox from "../Components/TextBox/TextBox";
import { Container, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from "@mui/material";
import Text from "../Components/Typography/Text";
import ErrorMessage from "../Components/ErrorMessage/ErrorMessage";
import { SignUpTwo, VerifyUserSteamId } from "../Services";
import Btn from "../Components/Button/Btn";
import { isValidDiscordUsername } from "../Utils";
import { useNavigate } from "react-router-dom";
import { Stepper, Step, StepLabel } from "@mui/material";
import Tooltip from "@mui/material/Tooltip";
import InfoIcon from "@mui/icons-material/Info";

const SignUpIdDetails = () => {
  const [steamId, setSteamId] = useState("");
  const [discordUserName, setdiscordUserName] = useState("");
  const [steamIdVerified, setSteamIdVerified] = useState(false);
  const [discordUserNameVerified, setdiscordUserNameVerified] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [warning, setWarning] = useState("");
  const [edited, setEdited] = useState(false);

  const [openDialog, setOpenDialog] = useState(false); // State for dialog box

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

    VerifyUserSteamId(steamId)
      .then((res) => {
        if (res && res.data && res.data.status) {
          const gamesCount = res.data.gamesCount || 0;
          if (gamesCount >= 5) {
            setSteamIdVerified(true);
            setError("");
          } else {
            setSteamIdVerified(false);
            setError("The STEAM account ID might be invalid, or it may have fewer than 5 games");
          }
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
  const handleInfoClick = () => {
    // Handle info click
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <Container maxWidth="sm">
      <Text variant="h4" gutterBottom={true} label={"Signup"} />
      <Stepper sx={{ marginTop: 5, marginBottom: 5 }} activeStep={1} alternativeLabel>
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
        <span
            style={{ color: "blue", fontSize: "0.8em", cursor: "pointer" }}
            onClick={handleOpenDialog} // Open dialog box when clicked
          >
            Where to find STEAM ID?
          </span>

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
        
        <Tooltip
          title={
            <div style={{ width: '300px', maxHeight: '800px' }}>
              <span style={{ fontSize: "10px" }}>
                <p>
                  Only server owners can invite the bot.{" "}
                  <a
                    href="https://discord.com/oauth2/authorize?client_id=1201316942959611964"
                    target="_blank" rel="noopener noreferrer"
                    style={{ color: "pink", textDecoration: "underline" }} // Apply lighter color and underline
                  >
                    Click here to invite the bot.
                  </a>
                </p>
              </span>
              <br />
            </div>
          }
          placement="right"
        >
                   < InfoIcon style={{ cursor: "pointer", color: "blue" }} />
        </Tooltip>
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

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Where to find STEAM ID?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Your Steam ID is a unique identifier associated with your Steam account. You can find your Steam ID by
            following these steps:
            <ol>
              <li>Launch the Steam client and log in.</li>
              <li>Click on your profile name at the top right corner of the Steam client.</li>
              <li>Select "View Profile".</li>
              <li>Once on your profile, right-click anywhere on the page and select "Copy Page URL".</li>
              <li>
                Paste the copied URL into the textbox below and click "Verify" to retrieve your Steam ID. Ensure the
                URL is in the following format:
                <code>https://steamcommunity.com/id/your_custom_url</code> or{" "}
                <code>https://steamcommunity.com/profiles/your_steam_id</code>.
              </li>
            </ol>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default SignUpIdDetails;

