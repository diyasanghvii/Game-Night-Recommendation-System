import React, { useState, useEffect } from "react";
import CheckboxList from "../Components/CheckboxList/CheckboxList.jsx";
import Btn from "../Components/Button/Btn.js";
import SelectServerChannel from "../Components/SelectServerChannel/SelectServerChannel.jsx";
import { GetPresence, SendList, GenerateRecommendations } from "../Services/index.js"; 
import MenuHeader from "../Components/MenuHeader/MenuHeader";
import RecommendationPopup from "../Components/RecommendationPopUp/RecommendationPopUp";

function RecommendGames() {
  const discordUserName = localStorage.getItem("discordUserName");
  const userName = localStorage.getItem("userName");
  const [selectedServer, setSelectedServer] = useState("");
  const [selectedChannel, setSelectedChannel] = useState("");
  const [memberStatus, setMemberStatus] = useState({
    Online: [],
    Offline: [],
    Voice: [],
  });
  const [selectedMembers, setSelectedMembers] = useState([{username: discordUserName, name: userName}]);
  const [recommendations, setRecommendations] = useState([]);
  const [showPopup, setShowPopup] = useState(false);

  // Handle server change
  const handleServerChange = (data) => {
    setSelectedServer(data);
  };

  // Handle channel change
  const handleChannelChange = (data) => {
    setSelectedChannel(data);
  };

  const fetchRecommendations = (selectedMembers) => {
    //const selectedNames = selectedMembers.map(memberObj => memberObj.username);
    GenerateRecommendations({ "selected_users": selectedMembers})
    .then((response) => {
      if (response && response.data) {
        setRecommendations(response.data.recommendedGames);
        setShowPopup(true);
      }
    })
    .catch((error) => {
      console.log(error);
      alert(error?.response?.data?.message);
    });
  };

  useEffect(() => {
    // Function to fetch presence data
    const fetchPresenceData = async () => {
      try {
        const response = await GetPresence({selectedServer, selectedChannel, discordUserName});
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
            case "idle":
              onlineList.push({ username: member.username, name: member.name });
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

    if (selectedServer && selectedChannel) {
      fetchPresenceData();
    } else {
      setMemberStatus({
        Online: [],
        Offline: [],
        Voice: [],
      });
    }
  }, [selectedServer, selectedChannel, discordUserName]);

  // Function to handle checkbox toggle
  const handleCheckboxToggle = (item) => {
    const index = selectedMembers.findIndex(member => member.username === item.username);
    if (index === -1) {
      setSelectedMembers([...selectedMembers, item]);
    } else {
      const updatedSelectedMembers = [...selectedMembers];
      updatedSelectedMembers.splice(index, 1);
      setSelectedMembers(updatedSelectedMembers);
    }
  };



  return (
    <>
    <MenuHeader />
    {showPopup && (
      <RecommendationPopup 
        recommendations={recommendations}
        selectedChannel={selectedChannel}
        selectedServer={selectedServer}
        selectedMembers={selectedMembers}
        onClose={() => { 
          setRecommendations([]);
          setShowPopup(false); 
      }}
      /> 
    )}
      <h1 style={{ marginLeft: "6rem" }}>
        Select Players from Discord 
      </h1>
      <p style={{ marginLeft: "6rem" }}>Selected Server: {selectedServer}<br/>Selected Voice Channel: {selectedChannel}</p>
      <SelectServerChannel
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
          <CheckboxList items={memberStatus.Voice} onCheckboxToggle={handleCheckboxToggle} />
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
          <CheckboxList items={memberStatus.Online} onCheckboxToggle={handleCheckboxToggle} />
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
          <CheckboxList items={memberStatus.Offline} onCheckboxToggle={handleCheckboxToggle} />
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
        <Btn label="Generate Recommendations" onClick={() => fetchRecommendations(selectedMembers)}></Btn>
      </div>
    </>
  );
}

export default RecommendGames;
