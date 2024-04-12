import React, { useState, useEffect } from "react";
import { Container, TextField, Button } from "@mui/material";
import MenuHeader from "../Components/MenuHeader/MenuHeader";
import { isValidDiscordUsername } from "../Utils";
import {
  VerifyUserSteamIdInEditProfile,
  CheckUniqueSteamIdAuthReq,
  CheckUniqueDiscordUserNameAuthReq,
} from "../Services";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";

const EditProfile = () => {
  const [name, setName] = useState("Testuser");
  const [age, setAge] = useState("23");
  const [steamId, setSteamId] = useState("76561199642434117");
  const [discordUsername, setDiscordUsername] = useState("naheerfatima_76086");
  const [email, setEmail] = useState("naheer@gmail.com");
  const [isEditing, setIsEditing] = useState(false);
  const [tempName, setTempName] = useState("");
  const [tempAge, setTempAge] = useState("");
  const [tempSteamId, setTempSteamId] = useState("");
  const [tempDiscordUsername, setTempDiscordUsername] = useState("");
  const [steamIdVerified, setSteamIdVerified] = useState(true);
  const [discordUsernameVerified, setDiscordUsernameVerified] = useState(true);
  const [discordUsernameError, setDiscordUsernameError] = useState("");
  const [error, setError] = useState("");
  const [saveDisabled, setSaveDisabled] = useState(true);
  const [detailsChanged, setDetailsChanged] = useState(false);

  useEffect(() => {
    if (steamIdVerified && discordUsernameVerified && detailsChanged) {
      setSaveDisabled(false);
    } else {
      setSaveDisabled(true);
    }
  }, [steamIdVerified, discordUsernameVerified, detailsChanged]);

  const handleEdit = () => {
    setIsEditing(true);
    setTempName(name);
    setTempAge(age);
    setTempSteamId(steamId);
    setTempDiscordUsername(discordUsername);
  };

  const handleSave = () => {
    setIsEditing(false);
    setDetailsChanged(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setName(tempName);
    setAge(tempAge);
    setSteamId(tempSteamId);
    setDiscordUsername(tempDiscordUsername);
    setDetailsChanged(false);
  };

  const handleVerifySteamId = () => {
    const paramBody = { steamId: steamId };
    VerifyUserSteamIdInEditProfile(paramBody)
      .then((res) => {
        if (res && res.data && res.data.status) {
          CheckUniqueSteamIdAuthReq(paramBody)
            .then((res) => {
              if (res && res.data && res.data.status) {
                setSteamIdVerified(true);
                setError("");
                setDetailsChanged(true);
              } else {
                if (res && res.data && res.data.existingUserEmail == email) {
                  setSteamIdVerified(true);
                  setError("");
                  setDetailsChanged(true);
                } else {
                  setError("Steam ID already exists.");
                  setSteamIdVerified(false);
                }
              }
            })
            .catch((e) => {
              setError(e?.response?.data?.message);
              setSteamIdVerified(false);
            });
        } else {
          setError("Invalid Steam ID.");
          setSteamIdVerified(false);
        }
      })
      .catch((e) => {
        setError("Invalid Steam ID.");
        setSteamIdVerified(false);
      });
  };

  const handleVerifyDiscordUsername = () => {
    if (isValidDiscordUsername(discordUsername)) {
      CheckUniqueDiscordUserNameAuthReq({ discordUserName: discordUsername })
        .then((res) => {
          if (res && res.data && res.data.status) {
            setDiscordUsernameVerified(true);
            setDiscordUsernameError("");
            setDetailsChanged(true);
          } else {
            if (res && res.data && res.data.existingUserEmail == email) {
              setDiscordUsernameVerified(true);
              setDiscordUsernameError("");
              setDetailsChanged(true);
            } else {
              setDiscordUsernameError("Discord Username already exists.");
              setDiscordUsernameVerified(false);
            }
          }
        })
        .catch((e) => {
          setDiscordUsernameError(e?.response?.data?.message);
          setDiscordUsernameVerified(false);
        });
    } else {
      setDiscordUsernameError("Invalid Discord Username.");
      setDiscordUsernameVerified(false);
    }
  };

  return (
    <>
      <MenuHeader />
      <Container maxWidth="sm">
        <div style={{ width: "80%", marginTop: 20 }}>
          <TextField
            label="Name"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={!isEditing}
          />
        </div>
        <div style={{ width: "80%", marginTop: 20 }}>
          <TextField
            label="Age"
            fullWidth
            value={age}
            onChange={(e) => setAge(e.target.value)}
            disabled={!isEditing}
          />
        </div>
        <div style={{ width: "80%", marginTop: 20 }}>
          <TextField
            label="Email"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={true}
          />
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: 20,
          }}
        >
          <div style={{ width: "80%" }}>
            <TextField
              label="Steam ID"
              fullWidth
              value={steamId}
              onChange={(e) => setSteamId(e.target.value)}
              disabled={!isEditing}
            />
            {isEditing && (
              <div
                style={{ display: "flex", alignItems: "center", marginTop: 5 }}
              >
                {steamIdVerified ? (
                  <>
                    <CheckIcon style={{ color: "green" }} />
                    <span style={{ marginLeft: 5, color: "green" }}>
                      Steam ID Verified
                    </span>
                  </>
                ) : (
                  <>
                    <ClearIcon style={{ color: "red" }} />
                    <span style={{ marginLeft: 5, color: "red" }}>{error}</span>
                  </>
                )}
              </div>
            )}
          </div>
          <div style={{ width: "13%", display: "flex", alignItems: "center" }}>
            {isEditing && (
              <Button
                variant="contained"
                onClick={handleVerifySteamId}
                style={{ width: "100%" }}
              >
                Verify
              </Button>
            )}
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: 20,
          }}
        >
          <div style={{ width: "80%" }}>
            <TextField
              label="Discord Username"
              fullWidth
              value={discordUsername}
              onChange={(e) => setDiscordUsername(e.target.value)}
              disabled={!isEditing}
            />
            {isEditing && (
              <div
                style={{ display: "flex", alignItems: "center", marginTop: 5 }}
              >
                {discordUsernameVerified ? (
                  <>
                    <CheckIcon style={{ color: "green" }} />
                    <span style={{ marginLeft: 5, color: "green" }}>
                      Discord Username Verified
                    </span>
                  </>
                ) : (
                  <>
                    <ClearIcon style={{ color: "red" }} />
                    <span style={{ marginLeft: 5, color: "red" }}>
                      {discordUsernameError}
                    </span>
                  </>
                )}
              </div>
            )}
          </div>
          <div style={{ width: "13%", display: "flex", alignItems: "center" }}>
            {isEditing && (
              <Button
                variant="contained"
                onClick={handleVerifyDiscordUsername}
                style={{ width: "100%" }}
              >
                Verify
              </Button>
            )}
          </div>
        </div>
        {isEditing ? (
          <>
            <div style={{ marginTop: 20, width: "80%" }}>
              <Button
                variant="contained"
                onClick={handleSave}
                fullWidth
                disabled={saveDisabled}
              >
                Save
              </Button>
            </div>
            <div style={{ marginTop: 20, width: "80%" }}>
              <Button variant="outlined" onClick={handleCancel} fullWidth>
                Cancel
              </Button>
            </div>
          </>
        ) : (
          <div style={{ marginTop: 20, width: "80%" }}>
            <Button variant="contained" onClick={handleEdit} fullWidth>
              Edit
            </Button>
          </div>
        )}
      </Container>
    </>
  );
};

export default EditProfile;
