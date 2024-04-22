import React, { useState, useEffect } from "react";
import Chip from "@mui/material/Chip";
import CheckboxList from "../Components/CheckboxList/CheckboxList.jsx";
import Btn from "../Components/Button/Btn.js";
import SelectServerChannel from "../Components/SelectServerChannel/SelectServerChannel.jsx";
import { GetPresence, GenerateRecommendations } from "../Services/index.js";
import MenuHeader from "../Components/MenuHeader/MenuHeader";
import RecommendationPopup from "../Components/RecommendationPopUp/RecommendationPopUp";
import CircularProgress from "@mui/material/CircularProgress";
import ParameterPopUp from "../Components/ParameterDialog/ParameterPopUp.js";
import "./CSS/RecommendGames.css";

function RecommendGames() {
  const discordUserName = localStorage.getItem("discordUserName");
  const userName = localStorage.getItem("userName");
  const [openParameterDialog, setParameterDialog] = useState(false);
  const [selectedServer, setSelectedServer] = useState("");
  const [selectedChannel, setSelectedChannel] = useState("");
  const [memberStatus, setMemberStatus] = useState({
    Online: [],
    Offline: [],
    Voice: [],
  });
  const [selectedMembers, setSelectedMembers] = useState([
    { username: discordUserName, name: userName },
  ]);
  const [recommendations, setRecommendations] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [isGeneratingRecommendations, setIsGeneratingRecommendations] =
    useState(false);
  const [isFetchingFromDiscord, setIsFetchingFromDiscord] = useState(true);
  const [parameterValues, setParameterValues] = useState({
    ownership: 0.5,
    ratings: 0.4,
    interest: 0.3,
    preferredGenres: 0.2,
    totalPlaytime: 0.6,
    playtime2Weeks: 0.5,
  });

  // Handle server change
  const handleServerChange = (data) => {
    setSelectedServer(data);
  };

  // Handle channel change
  const handleChannelChange = (data) => {
    setSelectedChannel(data);
  };

  const fetchRecommendations = (selectedMembers, parameterValues) => {
    //const selectedNames = selectedMembers.map(memberObj => memberObj.username);
    setIsGeneratingRecommendations(true);
    GenerateRecommendations({
      selected_users: selectedMembers,
      parameter_values: parameterValues,
    })
      .then((response) => {
        if (response && response.data) {
          setRecommendations(response.data.recommendedGames);
          setShowPopup(true);
        }
      })
      .catch((error) => {
        console.log(error);
        alert(error?.response?.data?.message);
      })
      .finally(() => setIsGeneratingRecommendations(false));
  };

  useEffect(() => {
    // Function to fetch presence data
    const fetchPresenceData = async () => {
      try {
        setIsFetchingFromDiscord(true);
        const response = await GetPresence({
          selectedServer,
          selectedChannel,
          discordUserName,
        });
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
              offlineList.push({
                username: member.username,
                name: member.name,
              });
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
      } finally {
        setIsFetchingFromDiscord(false);
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
      setIsFetchingFromDiscord(false);
    }
  }, [selectedServer, selectedChannel, discordUserName]);

  // Function to handle checkbox toggle
  const handleCheckboxToggle = (item) => {
    const index = selectedMembers.findIndex(
      (member) => member.username === item.username
    );
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
      <div
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.7)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "100vh",
        }}
      >
        <MenuHeader />
        <div style={{ padding: "20px" }}>
          {isFetchingFromDiscord && (
            <div className="loading-overlay">
              <div style={{ textAlign: "center" }}>
                <h3>Fetching data from Discord...</h3>
                <CircularProgress />
              </div>
            </div>
          )}
          {openParameterDialog && (
            <ParameterPopUp
              onClose={() => {
                setParameterDialog(false);
              }}
              onContinue={() => {
                setParameterDialog(false);
                fetchRecommendations(selectedMembers, parameterValues);
              }}
              onSave={(sliderValues) => {
                setParameterValues(sliderValues);
              }}
              parameter_values={parameterValues}
            />
          )}
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
          <h2 style={{ marginLeft: "6rem", color: "#fff" }}>
            Select Players from Discord
          </h2>
          <div
            style={{
              marginLeft: "6rem",
              color: "white",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <p>
              Selected Server:{" "}
              {selectedServer && (
                <>
                  <Chip
                    label={selectedServer}
                    style={{
                      backgroundColor: "rgba(50, 50, 50, 0.6)",
                      color: "lightgrey",
                      marginRight: "5px",
                    }}
                  />
                  &nbsp;
                </>
              )}
            </p>
            <p>
              Selected Voice Channel:{" "}
              {selectedChannel && (
                <>
                  <Chip
                    label={selectedChannel}
                    style={{
                      backgroundColor: "rgba(50, 50, 50, 0.6)",
                      color: "lightgrey",
                      marginRight: "5px",
                    }}
                  />
                  &nbsp;
                </>
              )}
            </p>
          </div>
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
                backgroundColor: "rgba(99, 168, 255, 0.60)", // Slightly darker blue with 45% transparency
                paddingBottom: "1em",
                margin: "1rem",
                minWidth: "350px",
                color: "white", // Text color white
              }}
            >
              <h3 style={{ textAlign: "center", marginBottom: "0px" }}>
                Listening
              </h3>
              <CheckboxList
                items={memberStatus.Voice}
                onCheckboxToggle={handleCheckboxToggle}
              />
            </div>
            <div
              style={{
                backgroundColor: "rgba(99, 255, 180, 0.60)", // Slightly darker green with 45% transparency
                paddingBottom: "1em",
                margin: "1rem",
                minWidth: "350px",
                color: "white", // Text color white
              }}
            >
              <h3 style={{ textAlign: "center", marginBottom: "0px" }}>
                Online
              </h3>
              <CheckboxList
                items={memberStatus.Online}
                onCheckboxToggle={handleCheckboxToggle}
              />
            </div>
            <div
              style={{
                backgroundColor: "rgba(250, 87, 87, 0.60)", // Slightly darker red with 45% transparency
                paddingBottom: "1em",
                margin: "1rem",
                minWidth: "350px",
                color: "white", // Text color white
              }}
            >
              <h3 style={{ textAlign: "center", marginBottom: "0px" }}>
                Offline
              </h3>
              <CheckboxList
                items={memberStatus.Offline}
                onCheckboxToggle={handleCheckboxToggle}
              />
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
            <Btn
              label="Generate Recommendations"
              onClick={() => setParameterDialog(true)}
            ></Btn>
            {isGeneratingRecommendations && (
              <div className="loading-overlay">
                <div style={{ textAlign: "center" }}>
                  <h3>Generating Recommendations... Hold on tight!</h3>
                  <CircularProgress />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default RecommendGames;
