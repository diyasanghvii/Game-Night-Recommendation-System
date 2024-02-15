import React, { useState } from "react";
import TextBox from "../TextBox/TextBox";
import { Container, Box } from "@mui/material"; 
import Btn from "../Button/Btn";
import Text from "../Typography/Text";
import ErrorMessage from "../ErrorMessage/ErrorMessage";

const Signup2 = () => {
  const [steamId, setSteamId] = useState("");
  const [discordId, setDiscordId] = useState("");
  const [webhookUrl, setWebhookUrl] = useState("");
  const [steamIdVerified, setSteamIdVerified] = useState(false);
  const [discordIdVerified, setDiscordIdVerified] = useState(false);
  const [error, setError] = useState("");
  const [warning, setWarning] = useState(""); 

  const handleVerifySteamId = () => {
    setSteamIdVerified(true);
  };

  const handleVerifyDiscordId = () => {
    setDiscordIdVerified(true);
  };

  const handleSignup = () => {
    if (!steamId || !discordId) {
      if (!steamId && discordId) {
        setError("Please provide your Steam ID.");
        return;
      }
      if (steamId && !discordId) {
        setError("Please provide your Discord ID.");
        return;
      }
      setWarning("Please provide your Steam ID and Discord ID.");
      return;
    }
  
    // Prepare data object in JSON format
    const data = {
      steamId: steamId,
      discordId: discordId,
      webhookUrl: webhookUrl
    };
    const jsonData = JSON.stringify(data);
    console.log("Signup Data:", jsonData);
  
    // You can add further logic here to handle the signup process
  };
  

  return (
    <Container maxWidth="sm">
      <Text variant="h4" gutterBottom={true} label={"Signup"} />
      
      {error && <ErrorMessage message={error} />}
      {warning && <ErrorMessage message={warning} />}
      
      <div style={{ maxWidth: "700px", margin: "auto", marginTop: "20px", display: "flex", flexDirection: "column", rowGap: "10px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <TextBox
            label="Steam ID"
            value={steamId}
            fullWidth={true}
            style={{ width: "80%" }} // Fixed width for textbox
            onChange={(e) => setSteamId(e.target.value)}
          />
          <Btn label="Verify" disabled={steamIdVerified} style={{ width: "5%" }} onClick={handleVerifySteamId} /> {/* Adjust width percentage for button */}
        </div>
        
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <TextBox
            label="Discord ID"
            value={discordId}
            fullWidth={true}
            style={{ width: "80%" }} // Fixed width for textbox
            onChange={(e) => setDiscordId(e.target.value)}
          />
          <Btn label="Verify" disabled={discordIdVerified} style={{ width: "5%" }} onClick={handleVerifyDiscordId} /> {/* Adjust width percentage for button */}
        </div>
      </div>

      <TextBox
        label="Discord Webhook URL"
        value={webhookUrl}
        fullWidth={true}
        onChange={(e) => setWebhookUrl(e.target.value)}
        style={{ width: "80%" }} // Fixed width for textbox
      />

      <Btn fullWidth={true} label={"Continue"} onClick={handleSignup} />
    </Container>
  );
};

export default Signup2;
