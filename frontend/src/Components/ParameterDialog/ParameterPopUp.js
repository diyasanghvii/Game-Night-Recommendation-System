import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import InfoIcon from "@mui/icons-material/Info";
import Slider from "@mui/material/Slider";
import Tooltip from "@mui/material/Tooltip";
import Btn from "../Button/Btn";
import Collapse from "@mui/material/Collapse";

function valuetext(value) {
  return value;
}

const weightInfo = {
  ownership: {"label":"Ownership", "info_text": "How much weight to give to games that everybody already owns."},
  interest: {"label":"Interest", "info_text": "How much weight to give to everybody's interest level in a game."},
  playtime2Weeks: {"label":"Last 2 Weeks Playtime", "info_text": "How much weight to give to the everybody's playtime in the last 2 weeks for a game (can be negative to prioritize less recently played games)."},
};

const advancedWeightInfo = {
  preferredGenres: {"label":"Genre Preferences", "info_text":"How much weight to give to games that match the everyone's preferred genres."},
  ratings: {"label":"User Ratings", "info_text":"How much weight to give to the everyone's ratings for games."},
  totalPlaytime: {"label":"Total Playtime", "info_text":"How much weight to give to the total playtime everybody has on a game."},
};

const RecommendationPopup = ({
  onClose,
  onContinue,
  onSave,
  parameter_values,
}) => {
  const [editWeights, setEditWeights] = useState(true);
  const [editWeightBtn, setEditWeightBtn] = useState("Edit");
  const [sliderValues, setSliderValues] = useState(parameter_values);
  const [showAdvanced, setShowAdvanced] = useState(false);

  const handleSliderChange = (name) => (event, newValue) => {
    setSliderValues({ ...sliderValues, [name]: newValue });
  };
  return (
    <Dialog
      open={true}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        style: {
          backgroundColor: "#1A2040",
        },
      }}
    >
      <DialogTitle style={{ color: "#fff", backgroundColor: "#242c53" }}>
        <strong>Set weights for the recommendation parameters</strong>
        <IconButton onClick={onClose} style={{ float: "right" }}>
          <CloseIcon style={{ color: "#fff" }} />
        </IconButton>
      </DialogTitle>

      <DialogContent
        style={{ color: "#fff", backgroundColor: "#1A2040", overflow: "auto" }}
      >
         <p style={{ marginBottom: "1rem" }}>
          Adjust the parameters below to prioritize what's most important to you when generating the recommendations for your group.
        </p>
        {Object.entries(weightInfo).map(([name, info]) => (
            <div key={name} style={{ display: "flex", alignItems: "flex-start", flexWrap: "wrap", margin: "10px 0" }}>
              <p>{info.label}</p>
              <Tooltip title={info.info_text}>
                <IconButton>
                  <InfoIcon sx={{ color: "white" }}/>
                </IconButton>
              </Tooltip>
              <Slider
                value={sliderValues[name]}
                onChange={handleSliderChange(name)}
                aria-label={`${name} Weight`}
                defaultValue={0.5}
                getAriaValueText={valuetext}
                valueLabelDisplay="auto"
                shiftStep={0.1}
                step={0.1}
                marks={true}
                disabled={editWeights}
                min={name === "playtime2Weeks" ? -1 : 0}
                max={1}
              />
            </div>
          ))}
          <Btn
          label={showAdvanced ? "Hide Advanced Options" : "Show Advanced Options"}
          onClick={() => setShowAdvanced(!showAdvanced)}
        />
        <Collapse in={showAdvanced}>
        {Object.entries(advancedWeightInfo).map(([name, info]) => (
            <div key={name} style={{ display: "flex", alignItems: "flex-start", flexWrap: "wrap", margin: "10px 0" }}>
              <p>{info.label}</p>
              <Tooltip title={info.info_text}>
                <IconButton>
                  <InfoIcon sx={{ color: "white" }}/>
                </IconButton>
              </Tooltip>
              <Slider
                value={sliderValues[name]}
                onChange={handleSliderChange(name)}
                aria-label={`${name} Weight`}
                defaultValue={0.5}
                getAriaValueText={valuetext}
                valueLabelDisplay="auto"
                shiftStep={0.1}
                step={0.1}
                marks={true}
                disabled={editWeights}
                min={name === "playtime2Weeks" ? -1 : 0}
                max={1}
              />
            </div>
          ))}
        </Collapse>
      </DialogContent>

      <div
        style={{
          display: "flex",
          alignSelf: "center",
          marginBottom: "15px",
          backgroundColor: "#1A2040",
        }}
      >
        <Btn
          label={editWeightBtn}
          onClick={() => {
            if (editWeightBtn === "Save") {
              onSave(sliderValues);
            }
            setEditWeights(!editWeights);
            setEditWeightBtn(editWeights ? "Save" : "Edit");
          }}
        />
        <div style={{ margin: "20px", backgroundColor: "#1A2040" }}></div>
        <Btn
          label={"Reset to Default"}
          onClick={async () => {
            await setSliderValues({
              ownership: 0.5,
              ratings: 0.4,
              interest: 0.3,
              preferredGenres: 0.2,
              totalPlaytime: 0.6,
              playtime2Weeks: 0.5,
            });
            setEditWeights(true);
            onSave({
              ownership: 0.5,
              ratings: 0.4,
              interest: 0.3,
              preferredGenres: 0.2,
              totalPlaytime: 0.6,
              playtime2Weeks: 0.5,
            });
          }}
          disable={!editWeights}
        />
        <div style={{ margin: "20px", backgroundColor: "#1A2040" }}></div>
        <Btn
          label={"Continue"}
          onClick={() => {
            onContinue();
          }}
          disable={!editWeights}
        />
      </div>
    </Dialog>
  );
};

export default RecommendationPopup;
