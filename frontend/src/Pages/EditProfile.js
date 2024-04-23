import React, { useState, useEffect } from "react";
import { Container, TextField, Button, Typography } from "@mui/material";
import MenuHeader from "../Components/MenuHeader/MenuHeader";
import { isValidDiscordUsername } from "../Utils";
import {
  VerifyUserSteamIdInEditProfile,
  CheckUniqueSteamIdAuthReq,
  CheckUniqueDiscordUserNameAuthReq,
  GetUserDetails,
  SaveUserDetails,
  DeleteUserDetails,
  CacheUserSteamGames,
} from "../Services";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import Text from "../Components/Typography/Text";
import { useNavigate } from "react-router-dom";
import { GetServerListEditProfile } from "../Services";

const EditProfile = () => {
  let navigate = useNavigate();
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
  const [discordUsernameFieldError, setDiscordUsernameFieldError] =
    useState(false);
  const [deleteError, setDeleteError] = useState("");

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
    setDeleteError("");
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
                const steamErrorMessage =
                  "Error fetching games for new Steam ID";
                console.log(steamErrorMessage, error);
                setError(steamErrorMessage);
              });
          }
        }
      })
      .catch((e) => {
        console.log(e);
        setError(e.message);
      });
  };

  const handleDeleteProfile = () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete your profile? Please confirm your password."
    );
    if (confirmDelete) {
      let password = "";
      while (!password) {
        password = prompt("Enter your password to confirm:");
        if (password === null) {
          // User clicked Cancel
          return;
        }
      }
      DeleteUserDetails({ password })
        .then((res) => {
          if (res && res.status == 200 && res.data) {
            sessionStorage.clear();
            localStorage.clear();
            navigate("/login");
          } else {
            setDeleteError("Failed to delete profile.");
          }
        })
        .catch((e) => {
          console.error(e);
          //setError("Failed to delete profile.");
          setDeleteError(
            e?.response?.data?.message || "Failed to delete profile."
          );
        });
    }
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
          setError(
            "The STEAM account ID might be invalid, or it may have fewer than 5 games."
          );
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

  const isPresenceBot = () => {
    const trimmedDiscordUsername = discordUsername.trim();
    GetServerListEditProfile(trimmedDiscordUsername)
      .then((response) => {
        if (
          response &&
          response.data &&
          response.data.serverList.length !== 0
        ) {
          setDiscordUsernameVerified(true);
          setDiscordUsernameError("");
          setDiscordUsernameFieldError(false);
          setDetailsChanged(true);
        } else {
          setDiscordUsernameError(
            "Discord User Name does not exist or does not have at least one server having the Presence Bot."
          );
          setDiscordUsernameVerified(false);
          setDiscordUsernameFieldError(true);
        }
      })
      .catch((error) => {
        console.log(error);
        setDiscordUsernameError(
          "Discord User Name does not exist or does not have at least one server having the Presence Bot."
        );
        setDiscordUsernameVerified(false);
      });
  };

  const handleVerifyDiscordUsername = () => {
    const trimmedDiscordUsername = discordUsername.trim();
    if (isValidDiscordUsername(trimmedDiscordUsername)) {
      CheckUniqueDiscordUserNameAuthReq({
        discordUserName: trimmedDiscordUsername,
      })
        .then((res) => {
          if (res && res.data && res.data.status) {
            isPresenceBot();
          } else {
            if (res && res.data && res.data.existingUserEmail === email) {
              isPresenceBot();
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
      <div
        className="all-root"
        style={{
          backgroundImage: "url('/images/Game Image.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "100vh",
        }}
      >
        <div
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.7)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            minHeight: "100vh",
          }}
        >
          <MenuHeader />
          <div
            style={{
              padding: "20px",
            }}
          >
            <div
              style={{
                minHeight: "80vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Container
                maxWidth="sm"
                sx={{
                  background: "rgba(0, 0, 0, 0.4)",
                  padding: 4,
                  borderRadius: 8,
                }}
              >
                <h2 style={{ color: "white" }}>Edit Profile</h2>
                <span style={{ marginLeft: 5, color: "red" }}>
                  {deleteError}
                </span>
                <div style={{ width: "100%", marginTop: 20 }}>
                  <TextField
                    label={
                      <Typography style={{ color: "white" }}>Name</Typography>
                    }
                    fullWidth
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    disabled={!isEditing}
                    error={nameError}
                    helperText={nameError ? "Name is required" : ""}
                    sx={{
                      "& .MuiInputBase-input.Mui-disabled": {
                        WebkitTextFillColor: "#fff",
                      },
                    }}
                    onBlur={() => {
                      if (name.trim() === "") {
                        setNameError(true);
                      } else {
                        setNameError(false);
                      }
                    }}
                    InputProps={{
                      style: { color: "white" }, // Set text color dynamically based on isEditing
                    }}
                    InputLabelProps={{
                      style: { color: "white" },
                    }}
                  />
                </div>
                <div style={{ width: "100%", marginTop: 20 }}>
                  <TextField
                    label={
                      <Typography style={{ color: "white" }}>Age</Typography>
                    }
                    fullWidth
                    value={age}
                    sx={{
                      "& .MuiInputBase-input.Mui-disabled": {
                        WebkitTextFillColor: "#fff",
                      },
                    }}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (!value <= 7 || !value >= 120) {
                        setAge(value);
                      }
                    }}
                    disabled={!isEditing}
                    type="number"
                    InputProps={{
                      style: { color: "white" }, // Set text color dynamically based on isEditing
                    }}
                    InputLabelProps={{
                      style: { color: "white" },
                    }}
                  />
                </div>
                <div style={{ width: "100%", marginTop: 20 }}>
                  <TextField
                    label={
                      <Typography style={{ color: "white" }}>Email</Typography>
                    }
                    fullWidth
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={true}
                    sx={{
                      "& .MuiInputBase-input.Mui-disabled": {
                        WebkitTextFillColor: "#fff",
                      },
                    }}
                    InputProps={{
                      style: { color: "white" }, // Set text color dynamically based on isEditing
                    }}
                    InputLabelProps={{
                      style: { color: "white" },
                    }}
                  />
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    marginTop: 20,
                  }}
                >
                  <div style={{ width: "80%" }}>
                    <TextField
                      label={
                        <Typography style={{ color: "white" }}>
                          Steam ID
                        </Typography>
                      }
                      fullWidth
                      value={steamId}
                      onChange={(e) => setSteamId(e.target.value)}
                      disabled={!isEditing}
                      error={steamIdError}
                      sx={{
                        "& .MuiInputBase-input.Mui-disabled": {
                          WebkitTextFillColor: "#fff",
                        },
                      }}
                      InputProps={{
                        style: { color: "white" }, // Set text color dynamically based on isEditing
                      }}
                      InputLabelProps={{
                        style: { color: "white" },
                      }}
                    />
                    {isEditing && (
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          marginTop: 5,
                        }}
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
                            <span style={{ marginLeft: 5, color: "red" }}>
                              {error}
                            </span>
                          </>
                        )}
                      </div>
                    )}
                  </div>
                  <div style={{ width: "13%" }}>
                    {isEditing && (
                      <Button
                        variant="contained"
                        onClick={handleVerifySteamId}
                        style={{ width: "100%" }}
                        sx={{
                          backgroundImage:
                            "linear-gradient(to right, rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0.2))", // Metallic gradient
                          backgroundColor: "rgba(0, 0, 0, 0.6)", // Black color with 60% transparency
                          color: "white",
                          transition:
                            "background-image 0.3s ease, background-color 0.3s ease",
                          "&:hover": {
                            backgroundImage:
                              "linear-gradient(to right, rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.3))", // Slightly brighter gradient on hover
                            backgroundColor: "rgba(32, 32, 32, 0.8)", // Darker black color on hover
                          },
                        }}
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
                    alignItems: "flex-start",
                    marginTop: 20,
                  }}
                >
                  <div style={{ width: "80%" }}>
                    <TextField
                      label={
                        <Typography style={{ color: "white" }}>
                          Discord Username
                        </Typography>
                      }
                      fullWidth
                      value={discordUsername}
                      onChange={(e) => setDiscordUsername(e.target.value)}
                      disabled={!isEditing}
                      error={discordUsernameFieldError}
                      sx={{
                        "& .MuiInputBase-input.Mui-disabled": {
                          WebkitTextFillColor: "#fff",
                        },
                      }}
                      InputProps={{
                        style: { color: "white" }, // Set text color dynamically based on isEditing
                      }}
                      InputLabelProps={{
                        style: { color: "white" },
                      }}
                    />
                    {isEditing && (
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          marginTop: 5,
                        }}
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
                  <div
                    style={{
                      width: "13%",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    {isEditing && (
                      <Button
                        variant="contained"
                        onClick={handleVerifyDiscordUsername}
                        style={{ width: "100%" }}
                        sx={{
                          backgroundImage:
                            "linear-gradient(to right, rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0.2))", // Metallic gradient
                          backgroundColor: "rgba(0, 0, 0, 0.6)", // Black color with 60% transparency
                          color: "white",
                          transition:
                            "background-image 0.3s ease, background-color 0.3s ease",
                          "&:hover": {
                            backgroundImage:
                              "linear-gradient(to right, rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.3))", // Slightly brighter gradient on hover
                            backgroundColor: "rgba(32, 32, 32, 0.8)", // Darker black color on hover
                          },
                        }}
                      >
                        Verify
                      </Button>
                    )}
                  </div>
                </div>
                {isEditing ? (
                  <>
                    <div style={{ marginTop: 20, width: "100%" }}>
                      <Button
                        variant="contained"
                        onClick={handleSave}
                        fullWidth
                        disabled={saveDisabled}
                        sx={{
                          backgroundImage:
                            "linear-gradient(to right, rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0.2))", // Metallic gradient
                          backgroundColor: "rgba(0, 0, 0, 0.6)", // Black color with 60% transparency
                          color: "white",
                          transition:
                            "background-image 0.3s ease, background-color 0.3s ease",
                          "&:hover": {
                            backgroundImage:
                              "linear-gradient(to right, rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.3))", // Slightly brighter gradient on hover
                            backgroundColor: "rgba(32, 32, 32, 0.8)", // Darker black color on hover
                          },
                        }}
                      >
                        Save
                      </Button>
                    </div>
                    <div style={{ marginTop: 20, width: "100%" }}>
                      <Button
                        variant="outlined"
                        onClick={handleCancel}
                        fullWidth
                        sx={{
                          backgroundImage:
                            "linear-gradient(to right, rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0.2))", // Metallic gradient
                          backgroundColor: "rgba(0, 0, 0, 0.6)", // Black color with 60% transparency
                          color: "white",
                          transition:
                            "background-image 0.3s ease, background-color 0.3s ease",
                          "&:hover": {
                            backgroundImage:
                              "linear-gradient(to right, rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.3))", // Slightly brighter gradient on hover
                            backgroundColor: "rgba(32, 32, 32, 0.8)", // Darker black color on hover
                          },
                        }}
                      >
                        Cancel
                      </Button>
                    </div>
                  </>
                ) : (
                  <div style={{ marginTop: 20, width: "100%" }}>
                    <Button
                      variant="contained"
                      onClick={handleEdit}
                      fullWidth
                      sx={{
                        backgroundImage:
                          "linear-gradient(to right, rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0.2))", // Metallic gradient
                        backgroundColor: "rgba(0, 0, 0, 0.6)", // Black color with 60% transparency
                        color: "white",
                        transition:
                          "background-image 0.3s ease, background-color 0.3s ease",
                        "&:hover": {
                          backgroundImage:
                            "linear-gradient(to right, rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.3))", // Slightly brighter gradient on hover
                          backgroundColor: "rgba(32, 32, 32, 0.8)", // Darker black color on hover
                        },
                      }}
                    >
                      Edit
                    </Button>
                  </div>
                )}
                {!isEditing && (
                  <div style={{ marginTop: 20, width: "100%" }}>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={handleDeleteProfile}
                      fullWidth
                      sx={{}}
                    >
                      Delete Profile
                    </Button>
                  </div>
                )}
              </Container>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditProfile;
