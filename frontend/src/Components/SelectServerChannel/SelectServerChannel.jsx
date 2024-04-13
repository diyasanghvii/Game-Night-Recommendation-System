import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Btn from "../Button/Btn.js";
import { GetServerList, GetChannelList } from "../../Services/index";

export default function SelectServerChannel({ onServerChange, onChannelChange }) {
  const [openServerDialog, setOpenServerDialog] = useState(false);
  const [openChannelDialog, setOpenChannelDialog] = useState(false);
  const [servers, setServers] = useState([]);
  const [channels, setChannels] = useState([]);
  const [selectedServer, setSelectedServer] = useState("");
  const [selectedChannel, setSelectedChannel] = useState("");
  const [loadingServers, setLoadingServers] = useState(false);
  const [loadingChannels, setLoadingChannels] = useState(false);

  useEffect(() => {
    fetchServers();
  }, []);

  const fetchServers = async () => {
    try {
      setSelectedServer("");
      setSelectedChannel("");
      onServerChange("");
      onChannelChange("");
      const discordUserName = localStorage.getItem("discordUserName");
      setLoadingServers(true);
      const response = await GetServerList(discordUserName);
      setServers(response?.data?.serverList);
      setOpenServerDialog(true);
    } catch (error) {
      console.error("Error fetching servers:", error);
    } finally {
      setLoadingServers(false);
    }
  };

  const fetchChannels = async () => {
    try {
      setLoadingChannels(true);
      const response = await GetChannelList(selectedServer);
      setChannels(response?.data?.voiceChannels);
      setOpenServerDialog(false);
      setOpenChannelDialog(true);
    } catch (error) {
      console.error("Error fetching channels:", error);
    } finally {
      setLoadingChannels(false);
    }
  };

  const handleServerChange = (event) => {
    setSelectedServer(event.target.value);
    onServerChange(event.target.value);
  };

  const handleChannelChange = (event) => {
    setSelectedChannel(event.target.value);
    onChannelChange(event.target.value);
  };

  const handleServerOk = () => {
    if (selectedServer) fetchChannels(selectedServer);
  };

  const handleChannelOk = () => {
    setOpenChannelDialog(false);
    // Handle further actions here
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Btn onClick={fetchServers} label="Change Server/Channel"></Btn>
      </div>
      <Dialog
        disableEscapeKeyDown
        open={openServerDialog}
        onClose={() => {}}
        PaperProps={{
          sx: {
            backgroundColor: "#1A2040",
          },
        }}
      >
        <DialogTitle sx={{ margin: "0", paddingBottom: "5px", color: "#fff" }}>
          Select a server
        </DialogTitle>
        {!selectedServer && (
          <DialogTitle
            sx={{
              fontSize: "10px",
              color: "pink",
              margin: "0",
              paddingTop: "0",
              paddingBottom: "0",
            }}
          >
            (Please select a server to continue)
          </DialogTitle>
        )}
        <DialogContent>
          {loadingServers && <p>Loading servers...</p>}
          <Box component="form" sx={{ display: "flex", flexWrap: "wrap" }}>
            <FormControl sx={{ m: 1, minWidth: 160 }}>
              <InputLabel id="server-dialog-select-label" sx={{ color: "#fff" }}>Server</InputLabel>
              <Select
                labelId="server-dialog-select-label"
                id="server-dialog-select"
                value={selectedServer}
                onChange={handleServerChange}
                input={<OutlinedInput label="Server" />}
                sx= {{color:"#fff"}}
              >
                {servers?.map((server, index) => (
                  <MenuItem key={index} value={server} style={{ color: '#fff', backgroundColor: '#1A2040' }}  >
                    {server}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleServerOk}>Ok</Button>
        </DialogActions>
      </Dialog>

      <Dialog
        disableEscapeKeyDown
        open={openChannelDialog}
        onClose={() => {}}
        PaperProps={{
          sx: {
            backgroundColor: "#1A2040",
          },
        }}
      >
        <DialogTitle sx={{ margin: "0", paddingBottom: "5px", color: "#fff" }}>
          Select a voice channel
        </DialogTitle>
        {!selectedChannel && (
          <DialogTitle
            sx={{
              fontSize: "10px",
              color: "pink",
              margin: "0",
              paddingTop: "0",
              paddingBottom: "0",
            
            }}
          >
            (Please select a channel to continue..)
          </DialogTitle>
        )}
        <DialogContent>
          {loadingChannels && <p>Loading channels...</p>}
          <Box component="form" sx={{ display: "flex", flexWrap: "wrap" }}>
            <FormControl sx={{ m: 1, minWidth: 160 }}>
              <InputLabel id="channel-dialog-select-label" sx={{ color: "#fff" }}>Channel</InputLabel>
              <Select
                labelId="channel-dialog-select-label"
                id="channel-dialog-select"
                value={selectedChannel}
                onChange={handleChannelChange}
                input={<OutlinedInput label="Channel" />}
                sx= {{color:"#fff"}}
              >
                {channels.map((channel, index) => (
                  <MenuItem
                  key={index}
                  value={channel}
                  style={{ color: '#fff', backgroundColor: '#1A2040' }}
                >
                  {channel}
                </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleChannelOk}>Ok</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}