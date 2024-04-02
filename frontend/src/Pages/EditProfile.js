import React, { useState, useEffect } from 'react';
import { Container, TextField, Button } from '@mui/material';
import MenuHeader from "../Components/MenuHeader/MenuHeader";
import { isValidDiscordUsername } from "../Utils";
import { VerifyUserSteamIdInEditProfile } from "../Services";
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';

const EditProfile = () => {
  const [name, setName] = useState('Testuser');
  const [age, setAge] = useState('23');
  const [steamId, setSteamId] = useState('1234455677223');
  const [discordUsername, setDiscordUsername] = useState('test_user45');
  const [email, setEmail] = useState('testuser@gmail.com');
  const [isEditing, setIsEditing] = useState(false);
  const [tempName, setTempName] = useState('');
  const [tempAge, setTempAge] = useState('');
  const [tempSteamId, setTempSteamId] = useState('');
  const [tempDiscordUsername, setTempDiscordUsername] = useState('');
  const [steamIdVerified, setSteamIdVerified] = useState(true);
  const [discordUsernameVerified, setDiscordUsernameVerified] = useState(true);
  const [discordUsernameError, setDiscordUsernameError] = useState('');
  const [error, setError] = useState('');
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
    VerifyUserSteamIdInEditProfile(steamId)
    .then((res) => {
      if (res && res.data && res.data.status) {
        setSteamIdVerified(true);
        setError("");
        setDetailsChanged(true); 
      }
    })
    .catch((e) => {
      setError("Invalid Steam ID.");
      setSteamIdVerified(false);
    });
  };

  const handleVerifyDiscordUsername = () => {
    if (isValidDiscordUsername(discordUsername)) {
      setDiscordUsernameVerified(true);
      setDiscordUsernameError('');
      setDetailsChanged(true); 
    } else {
      setDiscordUsernameVerified(false);
      setDiscordUsernameError('Invalid Discord Username.');
    }
  };

  return (
    <>
        <MenuHeader />
      <Container maxWidth="sm">
        <div style={{ width: '80%', marginTop: 20 }}>
          <TextField
            label="Name"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={!isEditing}
          />
        </div>
        <div style={{ width: '80%', marginTop: 20 }}>
          <TextField
            label="Age"
            fullWidth
            value={age}
            onChange={(e) => setAge(e.target.value)}
            disabled={!isEditing}
          />
        </div>
        <div style={{ width: '80%', marginTop: 20 }}>
          <TextField
            label="Email"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={true}
          />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 20 }}>
          <div style={{ width: '80%' }}>
            <TextField
              label="Steam ID"
              fullWidth
              value={steamId}
              onChange={(e) => setSteamId(e.target.value)}
              disabled={!isEditing}
            />
            {isEditing && (
              <div style={{ display: 'flex', alignItems: 'center', marginTop: 5 }}>
                {steamIdVerified ? (
                  <>
                    <CheckIcon style={{ color: 'green' }} />
                    <span style={{ marginLeft: 5, color: 'green' }}>Steam ID Verified</span>
                  </>
                ) : (
                  <>
                    <ClearIcon style={{ color: 'red' }} />
                    <span style={{ marginLeft: 5, color: 'red' }}>Invalid Steam ID</span>
                  </>
                )}
              </div>
            )}
          </div>
          <div style={{ width: '13%', display: 'flex', alignItems: 'center' }}>
            {isEditing && (
              <Button variant="contained" onClick={handleVerifySteamId} style={{ width: '100%' }}>
                Verify 
              </Button>
            )}
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 20 }}>
          <div style={{ width: '80%' }}>
            <TextField
              label="Discord Username"
              fullWidth
              value={discordUsername}
              onChange={(e) => setDiscordUsername(e.target.value)}
              disabled={!isEditing}
            />
            {isEditing && (
              <div style={{ display: 'flex', alignItems: 'center', marginTop: 5 }}>
                {discordUsernameVerified ? (
                  <>
                    <CheckIcon style={{ color: 'green' }} />
                    <span style={{ marginLeft: 5, color: 'green' }}>Discord Username Verified</span>
                  </>
                ) : (
                  <>
                    <ClearIcon style={{ color: 'red' }} />
                    <span style={{ marginLeft: 5, color: 'red' }}>Invalid Discord Username</span>
                  </>
                )}
              </div>
            )}
          </div>
          <div style={{ width: '13%', display: 'flex', alignItems: 'center' }}>
            {isEditing && (
              <Button variant="contained" onClick={handleVerifyDiscordUsername} style={{ width: '100%' }}>
                Verify 
              </Button>
            )}
          </div>
        </div>
        {isEditing ? (
          <>
            <div style={{ marginTop: 20, width: '80%' }}>
              <Button variant="contained" onClick={handleSave} fullWidth disabled={saveDisabled}>
                Save
              </Button>
            </div>
            <div style={{ marginTop: 20, width: '80%' }}>
              <Button variant="outlined" onClick={handleCancel} fullWidth>
                Cancel
              </Button>
            </div>
          </>
        ) : (
         
          <div style={{ marginTop: 20, width: '80%' }}>
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
