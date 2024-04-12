import React, { useState, useEffect } from "react";
import { Container, TextField, Button } from "@mui/material";
import MenuHeader from "../Components/MenuHeader/MenuHeader";
import { isValidDiscordUsername } from "../Utils";
import {
  VerifyUserSteamIdInEditProfile,
  CheckUniqueSteamIdAuthReq,
  CheckUniqueDiscordUserNameAuthReq,
  GetUserDetails,
  SaveUserDetails,
  CacheUserSteamGames,
} from "../Services";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";

const EditProfile = () => {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [steamId, setSteamId] = useState("");
  const [discordUsername, setDiscordUsername] = useState("");
  const [email, setEmail] = useState("");
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
  const [nameError, setNameError] = useState(false);
  const [steamIdError, setSteamIdError] = useState(false);
  const [discordUsernameFieldError, setDiscordUsernameFieldError] = useState(false);

  useEffect(() => {
    fetchUserDetails();
  }, []);

  useEffect(() => {
    if (steamIdVerified && discordUsernameVerified) {
      setSaveDisabled(false);
    } else {
      setSaveDisabled(true);
    }
  }, [steamIdVerified, discordUsernameVerified]);

  const fetchUserDetails = () => {
    GetUserDetails()
      .then((res) => {
        if (res && res.data) {
          setName(res.data.name);
          setAge(res.data.age || "");
          setSteamId(res.data.steamId);
          setDiscordUsername(res.data.discordUserName);
          setEmail(res.data.email);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const handleEdit = () => {
    setIsEditing(true);
    setTempName(name);
    setTempAge(age);
    setTempSteamId(steamId);
    setTempDiscordUsername(discordUsername);
  };

  const handleSave = () => {
    const trimmedName = name.trim();
    const trimmedSteamId = steamId.trim();
    const trimmedDiscordUsername = discordUsername.trim();

    if (trimmedName === "") {
      setNameError(true);
      return;
    }

    if (trimmedSteamId === "") {
      setSteamIdError(true);
      return;
    }

    if (trimmedDiscordUsername === "") {
      setDiscordUsernameFieldError(true);
      return;
    }

    const data = {
      name: trimmedName,
      age,
      steamId: trimmedSteamId,
      discordUserName: trimmedDiscordUsername,
    };

    SaveUserDetails(data)
      .then((res) => {
        if (res && res.data) {
          setIsEditing(false);
          setDetailsChanged(false);
          localStorage.setItem("userName", name);
          localStorage.setItem("discordUserName", discordUsername);
          if (steamId != tempSteamId) {
            console.log("Steam ID changed.. Caching owned games again");
            CacheUserSteamGames()
            .then((response) => {
              if (response) {
              }
            })
            .catch((e) => {
              const steamErrorMessage = "Error fetching games for new Steam ID";
              console.log(steamErrorMessage, error);
              setError(steamErrorMessage);
            });;
          }
        }
      })
      .catch((e) => {
        console.log(e);
        setError(e.message);
      });
  };

  const handleCancel = () => {
    setIsEditing(false);
    setName(tempName);
    setAge(tempAge);
    setSteamId(tempSteamId);
    setDiscordUsername(tempDiscordUsername);
    setDetailsChanged(false);
    setNameError(false);
    setSteamIdError(false);
    setDiscordUsernameFieldError(false);
    setSteamIdVerified(true);
    setDiscordUsernameVerified(true);
    setError("");
  };

  const handleVerifySteamId = () => {
    const paramBody = { steamId: steamId.trim() };
    VerifyUserSteamIdInEditProfile(paramBody)
      .then((res) => {
        if (res && res.data && res.data.status && res.data.gamesCount >= 5) {
          CheckUniqueSteamIdAuthReq(paramBody)
            .then((res) => {
              if (res && res.data && res.data.status) {
                setSteamIdVerified(true);
                setError("");
                setDetailsChanged(true);
                setSteamIdError(false);
              } else {
                if (res && res.data && res.data.existingUserEmail === email) {
                  setSteamIdVerified(true);
                  setError("");
                  setDetailsChanged(true);
                  setSteamIdError(false);
                } else {
                  setError("Steam ID already exists in the system.");
                  setSteamIdVerified(false);
                  setSteamIdError(true);
                }
              }
            })
            .catch((e) => {
              setError(e?.response?.data?.message);
              setSteamIdVerified(false);
              setSteamIdError(true);
            });
        } else {
          setError("The STEAM account ID might be invalid, or it may have fewer than 5 games.");
          setSteamIdVerified(false);
          setSteamIdError(true);
        }
      })
      .catch((e) => {
        setError("Invalid Steam ID.");
        setSteamIdVerified(false);
        setSteamIdError(true);
      });
  };

  const handleVerifyDiscordUsername = () => {
    const trimmedDiscordUsername = discordUsername.trim();
    if (isValidDiscordUsername(trimmedDiscordUsername)) {
      CheckUniqueDiscordUserNameAuthReq({ discordUserName: trimmedDiscordUsername })
        .then((res) => {
          if (res && res.data && res.data.status) {
            setDiscordUsernameVerified(true);
            setDiscordUsernameError("");
            setDetailsChanged(true);
            setDiscordUsernameFieldError(false);
          } else {
            if (res && res.data && res.data.existingUserEmail === email) {
              setDiscordUsernameVerified(true);
              setDiscordUsernameError("");
              setDetailsChanged(true);
              setDiscordUsernameFieldError(false);
            } else {
              setDiscordUsernameError("Discord Username already exists.");
              setDiscordUsernameVerified(false);
              setDiscordUsernameFieldError(true);
            }
          }
        })
        .catch((e) => {
          setDiscordUsernameError(e?.response?.data?.message);
          setDiscordUsernameVerified(false);
          setDiscordUsernameFieldError(true);
        });
    } else {
      setDiscordUsernameError("Invalid Discord Username.");
      setDiscordUsernameVerified(false);
      setDiscordUsernameFieldError(true);
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
            error={nameError}
            helperText={nameError ? "Name is required" : ""}
            onBlur={() => {
              if (name.trim() === "") {
                setNameError(true);
              } else {
                setNameError(false);
              }
            }}
          />
        </div>
        <div style={{ width: "80%", marginTop: 20 }}>
          <TextField
            label="Age"
            fullWidth
            value={age}
            onChange={(e) => {
              const value = e.target.value;
              if (!value <= 7 || !value >= 120) {
                setAge(value);
              }
            }}
            disabled={!isEditing}
            type="number"
            
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
              error={steamIdError}
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
              error={discordUsernameFieldError}
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
