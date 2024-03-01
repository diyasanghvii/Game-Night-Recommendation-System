import React, { useState } from "react";
import TextBox from "../TextBox/TextBox";
import { Container, Box } from "@mui/material";
import Btn from "../Button/Btn";
import Text from "../Typography/Text";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import { SignUpTwo } from "../../Services";

const Signup2 = ({ email, stepTwoDone }) => {
  const [steamId, setSteamId] = useState("");
  const [discordUserName, setdiscordUserName] = useState("");
  const [DiscordServerName, setDiscordServerName] = useState("");
  const [DiscordChannelName, setDiscordChannelName] = useState("");
  const [steamIdVerified, setSteamIdVerified] = useState(false);
  const [discordUserNameVerified, setdiscordUserNameVerified] = useState(false);
  const [error, setError] = useState("");
  const [warning, setWarning] = useState("");

  const handleVerifySteamId = () => {
    setSteamIdVerified(true);
  };

  const handleVerifydiscordUserName = () => {
    setdiscordUserNameVerified(true);
  };

  const handleSignup = () => {
    if (!steamId || !discordUserName) {
      if (!steamId && discordUserName) {
        setError("Please provide your Steam ID.");
        return; 
      }
      if (steamId && !discordUserName) {
        setError("Please provide your Discord Username.");
        return;
      }
      setWarning("Please provide your Steam ID and Discord Username.");
      return;
    }
    console.log("Steam ID:", steamId);
    console.log("Discord Username:", discordUserName);
  
    const data = {
      email: email,
      steamId: steamId,
      discordUserName: discordUserName,
    };
  
    SignUpTwo(data)
      .then((response) => {
        if (response && response.data) {
          stepTwoDone();
        }
      })
      .catch((error) => {
        alert(error?.response?.data?.message);
      });
  };
  

  return (
    <Container maxWidth="sm">
      <Text variant="h4" gutterBottom={true} label={"Signup"} />

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
            style={{ width: "80%" }} // Fixed width for textbox
            onChange={(e) => setSteamId(e.target.value)}
          />
          <Btn
            label="Verify"
            disabled={steamIdVerified}
            style={{ width: "5%" }}
            onClick={handleVerifySteamId}
          />{" "}
          {/* Adjust width percentage for button */}
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <TextBox
            label="Discord Username"
            value={discordUserName}
            fullWidth={true}
            style={{ width: "80%" }} // Fixed width for textbox
            onChange={(e) => setdiscordUserName(e.target.value)}
          />
          <Btn
            label="Verify"
            disabled={discordUserNameVerified}
            style={{ width: "5%" }}
            onClick={handleVerifydiscordUserName}
          />{" "}
          {/* Adjust width percentage for button */}
        </div>
      </div>
 <Btn fullWidth={true} label={"Continue"} onClick={handleSignup} />
    </Container>
  );

      }
export default Signup2;
