import React, { useState } from 'react';
import { Container, TextField, Button, Avatar, Box } from '@mui/material';
import MenuHeader from '../Components/MenuHeader/MenuHeader';

const EditProfile = () => {
  const [name, setName] = useState('Testuser');
  const [age, setAge] = useState('23');
  const [email, setEmail] = useState('testuser@gmail.com');
  const [steamId, setSteamId] = useState('1234455677223');
  const [discordUsername, setDiscordUsername] = useState('test_user45');
  const [isEditing, setIsEditing] = useState(false);
  const [tempName, setTempName] = useState('');
  const [tempAge, setTempAge] = useState('');
  const [tempEmail, setTempEmail] = useState('');
  const [tempSteamId, setTempSteamId] = useState('');
  const [tempDiscordUsername, setTempDiscordUsername] = useState('');
  const [tempProfileImage, setTempProfileImage] = useState(null);
  const [profileImage, setProfileImage] = useState(null);

  const handleEdit = () => {
    setIsEditing(true);
    setTempName(name);
    setTempAge(age);
    setTempEmail(email);
    setTempSteamId(steamId);
    setTempDiscordUsername(discordUsername);
    setTempProfileImage(profileImage); 
  };

  const handleSave = () => {
    setIsEditing(false);
    setProfileImage(tempProfileImage); 
  };

  const handleCancel = () => {
    setIsEditing(false);
    setName(tempName);
    setAge(tempAge);
    setEmail(tempEmail);
    setSteamId(tempSteamId);
    setDiscordUsername(tempDiscordUsername);
    setTempProfileImage(profileImage); 
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setTempProfileImage(reader.result); 
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <div style={{ marginTop: 20 }}>
        <MenuHeader />
      </div>
      <Container maxWidth="sm">
        {isEditing ? (
          <Box display="flex" justifyContent="center" alignItems="center" flexDirection="column" style={{ marginTop: 20 }}>
            <Avatar alt="Profile Image" src={tempProfileImage} sx={{ width: 100, height: 100 }} />
            <input type="file" accept="image/*" onChange={handleImageChange} />
          </Box>
        ) : (
          <Box display="flex" justifyContent="center" alignItems="center" style={{ marginTop: 20 }}>
            <Avatar alt="Profile Image" src={profileImage} sx={{ width: 100, height: 100 }} />
          </Box>
        )}
        <div style={{ marginTop: 20 }}>
          <TextField
            label="Name"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={!isEditing}
          />
        </div>
        <div style={{ marginTop: 20 }}>
          <TextField
            label="Age"
            fullWidth
            value={age}
            onChange={(e) => setAge(e.target.value)}
            disabled={!isEditing}
          />
        </div>
        <div style={{ marginTop: 20 }}>
          <TextField
            label="Email ID"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={!isEditing}
          />
        </div>
        <div style={{ marginTop: 20 }}>
          <TextField
            label="Steam ID"
            fullWidth
            value={steamId}
            onChange={(e) => setSteamId(e.target.value)}
            disabled={!isEditing}
          />
        </div>
        <div style={{ marginTop: 20 }}>
          <TextField
            label="Discord Username"
            fullWidth
            value={discordUsername}
            onChange={(e) => setDiscordUsername(e.target.value)}
            disabled={!isEditing}
          />
        </div>
        {isEditing ? (
          <div style={{ marginTop: 20 }}>
            <Button variant="contained" onClick={handleSave} fullWidth>
              Save
            </Button>
          </div>
        ) : (
          <div style={{ marginTop: 20 }}>
            <Button variant="contained" onClick={handleEdit} fullWidth>
              Edit
            </Button>
          </div>
        )}
        {isEditing && (
          <div style={{ marginTop: 20 }}>
            <Button variant="outlined" onClick={handleCancel} fullWidth>
              Cancel
            </Button>
          </div>
        )}
      </Container>
    </>
  );
};

export default EditProfile;