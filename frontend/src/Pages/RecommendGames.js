import React, { useState, useEffect } from "react";
import CheckboxList from "../Components/CheckboxList/CheckboxList.jsx";
import Btn from "../Components/Button/Btn.js";
import DropDown from "../Components/DropDown/DropDown.jsx";
import { GetPresence } from "../Services/index.js"; 

function RecommendGames() {
  const [selectedServer, setSelectedServer] = useState("");
  const [selectedChannel, setSelectedChannel] = useState("");
  const [memberStatus, setMemberStatus] = useState({
    Online: [],
    Offline: [],
    Voice: [],
  });

  // Function to fetch presence data
  const fetchPresenceData = async () => {
    try {
      console.log(selectedServer, selectedChannel);
      const response = await GetPresence({selectedServer, selectedChannel});
      const { memberStatus: presenceData } = response.data;
      const onlineList = [];
      const offlineList = [];
      const voiceList = [];

      // Divide the response into three lists based on presence status
      presenceData.forEach((member) => {
        switch (member.presence) {
          case "online":
            onlineList.push({ username: member.username, name: member.name });
            break;
          case "offline":
            offlineList.push({ username: member.username, name: member.name });
            break;
          case "voice":
            voiceList.push({ username: member.username, name: member.name });
            break;
          default:
            break;
        }
      });

      // Update state with the divided lists
      setMemberStatus({
        Online: onlineList,
        Offline: offlineList,
        Voice: voiceList,
      });
    } catch (error) {
      console.error("Error fetching presence data:", error);
    }
  };

  // Handle server change
  const handleServerChange = (data) => {
    setSelectedServer(data);
  };

  // Handle channel change
  const handleChannelChange = (data) => {
    setSelectedChannel(data);
  };

  useEffect(() => {
    if (selectedServer && selectedChannel) {
      fetchPresenceData();
    }
    else if(!selectedServer || !selectedChannel){
      setMemberStatus({
        Online: [],
        Offline: [],
        Voice: [],
      });
    }
  }, [selectedServer, selectedChannel]);

  return (
    <>
      <h1 style={{ marginLeft: "6rem" }}>
        Select Players from Discord 
      </h1>
      <p style={{ marginLeft: "6rem" }}>Selected Server: {selectedServer}<br/>Selected Voice Channel: {selectedChannel}</p>
      <DropDown
        onServerChange={(data) => handleServerChange(data)}
        onChannelChange={(data) => handleChannelChange(data)}
      />
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "flex-start",
          flexWrap: "wrap",
          marginLeft: "1.5rem",
          marginRight: "1.5rem",
          marginTop: "3rem",
        }}
      >
        <div
          style={{
            backgroundColor: "#1565c014",
            paddingBottom: "1em",
            margin: "1rem",
            minWidth: "350px"
          }}
        >
          <h3 style={{ textAlign: "center", marginBottom: "0px" }}>
            Listening
          </h3>
          <CheckboxList items={memberStatus.Voice} />
        </div>
        <div
          style={{
            backgroundColor: "#28d2191f",
            paddingBottom: "1em",
            margin: "1rem",
            minWidth: "350px"
          }}
        >
          <h3 style={{ textAlign: "center", marginBottom: "0px" }}>Online</h3>
          <CheckboxList items={memberStatus.Online} />
        </div>
        <div
          style={{
            backgroundColor: "#d219191f",
            paddingBottom: "1em",
            margin: "1rem",
            minWidth: "350px"
          }}
        >
          <h3 style={{ textAlign: "center", marginBottom: "0px" }}>Offline</h3>
          <CheckboxList items={memberStatus.Offline} />
        </div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          flexWrap: "wrap",
          marginTop: "3rem",
        }}
      >
        <Btn label="Send Recommendation List"></Btn>
      </div>
    </>
  );
}

export default RecommendGames;
