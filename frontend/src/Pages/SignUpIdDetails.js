import React, { useState, useEffect } from "react";
import TextBox from "../Components/TextBox/TextBox";
import {
  Container,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";
import Text from "../Components/Typography/Text";
import ErrorMessage from "../Components/ErrorMessage/ErrorMessage";
import {
  SignUpTwo,
  VerifyUserSteamId,
  CheckUniqueSteamId,
  CheckUniqueDiscordUserName,
} from "../Services";
import Btn from "../Components/Button/Btn";
import { isValidDiscordUsername } from "../Utils";
import { useNavigate } from "react-router-dom";
import { Stepper, Step, StepLabel } from "@mui/material";
import Tooltip from "@mui/material/Tooltip";
import InfoIcon from "@mui/icons-material/Info";
import { GetServerListSignUp } from "../Services";

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
  const [infoDialogOpen, setInfoDialogOpen] = useState(false);
  const [showInfo, setShowInfo] = useState(false);

  useEffect(() => {
    if (steamIdVerified && discordUserNameVerified) {
      setWarning("");
    }
  }, [steamIdVerified, discordUserNameVerified]);

  const isPresenceBot = () => {
    GetServerListSignUp(discordUserName)
      .then((response) => {
        if (
          response &&
          response.data &&
          response.data.serverList.length !== 0
        ) {
          setdiscordUserNameVerified(true);
          setError("");
        } else {
          setError(
            "Discord User Name does not exist or does not have at least one server having the Presence Bot."
          );
          setdiscordUserNameVerified(false);
        }
      })
      .catch((error) => {
        console.log(error);
        setError(
          "Discord User Name does not exist or does not have at least one server having the Presence Bot."
        );
        setdiscordUserNameVerified(false);
      });
  };
  const handleVerifySteamId = () => {
    if (!steamId) {
      setError("Please provide your Steam ID.");
      return;
    }
    if (edited) {
      setError("");
    }
    // Call the CheckUniqueSteamId function to check if the Steam ID is unique
    const paramBody = { steamId: steamId };
    CheckUniqueSteamId(paramBody)
      .then((res) => {
        // If the Steam ID is unique, proceed with verifying it
        if (res && res.data && res.data.status) {
          VerifyUserSteamId(paramBody)
            .then((res) => {
              if (res && res.data && res.data.status) {
                const gamesCount = res.data.gamesCount || 0;
                if (gamesCount >= 5) {
                  setSteamIdVerified(true);
                  setError("");
                } else {
                  setSteamIdVerified(false);
                  setError(
                    "The STEAM account ID might be invalid, or it may have fewer than 5 games"
                  );
                }
              }
            })
            .catch((e) => {
              setError("Invalid Steam ID.");
              setSteamIdVerified(false);
            });
        } else {
          // If the Steam ID is not unique, set an error message
          setError("Steam ID already exists.");
          setSteamIdVerified(false);
        }
      })
      .catch((error) => {
        console.log(error);
        setError(error?.response?.data?.message || "Error checking Steam ID.");
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

    // Call the CheckUniqueDiscordUserName function to check if the Discord Username is unique
    CheckUniqueDiscordUserName({ discordUserName: discordUserName })
      .then((res) => {
        // If the Discord Username is unique, proceed with verifying it
        if (res && res.data && res.data.status) {
          if (isValidDiscordUsername(discordUserName)) {
            isPresenceBot();
          } else {
            setError("Invalid Discord User Name.");
            setdiscordUserNameVerified(false);
          }
        } else {
          // If the Discord Username is not unique, set an error message
          setError("Discord Username already exists.");
          setdiscordUserNameVerified(false);
        }
      })
      .catch((error) => {
        setError(
          error?.response?.data?.message || "Error checking Discord Username."
        );
        setdiscordUserNameVerified(false);
      });
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

  const handleOpenDialog = (type) => {
    if (type === "info") {
      setInfoDialogOpen(true);
    } else {
      setOpenDialog(true);
    }
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleInfoClick = () => {
    setShowInfo((prevShowInfo) => !prevShowInfo);
  };

  return (
    <div
      className="all-root"
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
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
              <span style={{ color: "green", fontSize: "1.5em" }}>
                &#10004;
              </span>
            ) : (
              <span style={{ color: "red", fontSize: "1.5em" }}>&#10006;</span>
            )}

            <Btn
              label="Verify"
              disabled={steamIdVerified}
              style={{ width: "5%" }}
              onClick={handleVerifySteamId}
            />
            <InfoIcon
              style={{ cursor: "pointer", color: "#ffffff" }}
              onClick={() => handleOpenDialog("info")}
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
              <span style={{ color: "green", fontSize: "1.5em" }}>
                &#10004;
              </span>
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
                <div style={{ width: "300px", maxHeight: "800px" }}>
                  <span style={{ fontSize: "10px" }}>
                    <p>
                      Only server owners can invite the bot.{" "}
                      <a
                        href="https://discord.com/oauth2/authorize?client_id=1201316942959611964"
                        target="_blank"
                        rel="noopener noreferrer"
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
              <InfoIcon style={{ cursor: "pointer", color: "#ffffff" }} />
            </Tooltip>
          </div>
        </div>

        <div style={{ marginTop: 20 }}>
          <button
            style={{
              backgroundImage:
                "linear-gradient(to right, rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.3))",
              backgroundColor: "rgba(0, 0, 0, 0.6)",
              color: "white",
              width: "100%",
              borderRadius: "4px",
              padding: "10px 20px",
              fontSize: "16px",
              border: "none",
              cursor: "pointer",
              boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.25)",
              transition:
                "background-image 0.3s ease, background-color 0.3s ease",
              "&:hover": {
                backgroundImage:
                  "linear-gradient(to right, rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.3))", // Slightly brighter gradient on hover
                backgroundColor: "rgba(32, 32, 32, 0.8)", // Darker black color on hover
              },
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
        </div>

        <Dialog open={infoDialogOpen} onClose={() => setInfoDialogOpen(false)}>
          <DialogTitle sx={{ backgroundColor: "#07294a", color: "#fff" }}>
            Information
          </DialogTitle>
          <DialogContent sx={{ backgroundColor: "#07294a", color: "#fff" }}>
            <DialogContentText sx={{ color: "#fff" }}>
              To find your Steam ID, follow these steps:
              <ol>
                <li>Open the Steam app.</li>
                <li>Click on your profile icon.</li>
                <li>Select "Account details".</li>
                <li>
                  Your Steam ID is located below your name and is a 17-digit
                  number.
                </li>
              </ol>
            </DialogContentText>
            <DialogContentText sx={{ color: "#fff" }}>
              The app needs your profile to be public in your STEAM account in
              order to generate recommendations based on games you own. <br />
              <br />
              <strong>Note:</strong> This data is not shared with any third
              party.
            </DialogContentText>
            <img
              src={process.env.PUBLIC_URL + "/images/STEAMv2.png"}
              alt="Tooltip Image"
              style={{ width: "500px", height: "auto" }}
            />
          </DialogContent>
          <DialogActions sx={{ backgroundColor: "#07294a", color: "#fff" }}>
            <Button
              onClick={() => setInfoDialogOpen(false)}
              color="primary"
              style={{
                marginTop: "10px",
                background: "linear-gradient(45deg, #333333, #555555)",
                color: "#DDDDDD", // Light grey
                marginLeft: "10px",
                boxShadow:
                  "0 4px 8px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19)", // Metallic shine
              }}
            >
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </div>
  );
};

export default SignUpIdDetails;
