import React from "react";
import Divider from "@mui/material/Divider";
import CheckboxList from "../Components/CheckboxList/CheckboxList.jsx";
import Btn from "../Components/Button/Btn.js";

function RecommendGames({}) {
  return (
    <>
      <h1 style={{ marginLeft: "6rem" }}>Select Players</h1>
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          flexWrap: "wrap",
          marginLeft: "1.5rem",
          marginRight: "1.5rem",
          marginTop: "3rem",
        }}
      >
        <div style={{ backgroundColor: "#1565c014", paddingBottom: "1em", margin: "1rem", }}>
          <h3 style={{ textAlign: "center", marginBottom: "0px" }}>
            Listening
          </h3>
          <CheckboxList />
        </div>
        <div style={{ backgroundColor: "#28d2191f", paddingBottom: "1em", margin: "1rem",  }}>
          <h3 style={{ textAlign: "center", marginBottom: "0px" }}>Online</h3>
          <CheckboxList />
        </div>
        <div style={{ backgroundColor: "#d219191f", paddingBottom: "1em", margin: "1rem", }}>
          <h3 style={{ textAlign: "center", marginBottom: "0px" }}>Offline</h3>
          <CheckboxList />
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
