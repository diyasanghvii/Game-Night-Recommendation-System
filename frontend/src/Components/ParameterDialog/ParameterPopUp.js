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

function valuetext(value) {
  return value;
}

const RecommendationPopup = ({
  onClose,
  onContinue,
  onSave,
  parameter_values,
}) => {
  const [editWeights, setEditWeights] = useState(true);
  const [editWeightBtn, setEditWeightBtn] = useState("Edit");
  const [sliderValues, setSliderValues] = useState(parameter_values);

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
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            flexWrap: "wrap",
          }}
        >
          <p>Ownership weight</p>
          <Tooltip title="Ownership weight info">
            <IconButton>
              <InfoIcon />
            </IconButton>
          </Tooltip>
        </div>
        <Slider
          value={sliderValues.ownership}
          onChange={handleSliderChange("ownership")}
          aria-label="Ownership Weight"
          defaultValue={0.5}
          getAriaValueText={valuetext}
          valueLabelDisplay="auto"
          shiftStep={0.1}
          step={0.1}
          marks={true}
          disabled={editWeights}
          min={0}
          max={1}
          sx={{ color: "rgba(255, 192, 203, 0.5)" }}
        />
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            flexWrap: "wrap",
          }}
        >
          <p>Preferred Genres weight</p>
          <Tooltip title="Preferred Genres weight info">
            <IconButton>
              <InfoIcon />
            </IconButton>
          </Tooltip>
        </div>
        <Slider
          value={sliderValues.preferredGenres}
          onChange={handleSliderChange("preferredGenres")}
          aria-label="Preferred Genres weight"
          defaultValue={0.5}
          getAriaValueText={valuetext}
          valueLabelDisplay="auto"
          shiftStep={0.1}
          step={0.1}
          marks={true}
          disabled={editWeights}
          min={0}
          sx={{ color: "rgba(255, 192, 203, 0.5)" }}
          max={1}
        />
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            flexWrap: "wrap",
          }}
        >
          <p>Ratings weight</p>
          <Tooltip title="Ratings weight info">
            <IconButton>
              <InfoIcon />
            </IconButton>
          </Tooltip>
        </div>
        <Slider
          value={sliderValues.ratings}
          onChange={handleSliderChange("ratings")}
          aria-label="Ratings weight"
          defaultValue={0.5}
          getAriaValueText={valuetext}
          valueLabelDisplay="auto"
          shiftStep={0.1}
          step={0.1}
          marks={true}
          disabled={editWeights}
          min={0}
          max={1}
          sx={{ color: "rgba(255, 192, 203, 0.5)" }}
        />
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            flexWrap: "wrap",
          }}
        >
          <p>Interest weight</p>
          <Tooltip title="Interest weight info">
            <IconButton>
              <InfoIcon />
            </IconButton>
          </Tooltip>
        </div>
        <Slider
          value={sliderValues.interest}
          onChange={handleSliderChange("interest")}
          aria-label="Interest weight"
          defaultValue={0.5}
          getAriaValueText={valuetext}
          valueLabelDisplay="auto"
          shiftStep={0.1}
          step={0.1}
          marks={true}
          disabled={editWeights}
          min={0}
          max={1}
          sx={{ color: "rgba(255, 192, 203, 0.5)" }}
        />
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            flexWrap: "wrap",
          }}
        >
          <p>Total Playtime weight</p>
          <Tooltip title="Total Playtime info">
            <IconButton>
              <InfoIcon />
            </IconButton>
          </Tooltip>
        </div>
        <Slider
          value={sliderValues.totalPlaytime}
          onChange={handleSliderChange("totalPlaytime")}
          aria-label="Total Playtime weight"
          defaultValue={0.5}
          getAriaValueText={valuetext}
          valueLabelDisplay="auto"
          shiftStep={0.1}
          step={0.1}
          marks={true}
          disabled={editWeights}
          min={0}
          max={1}
          sx={{ color: "rgba(255, 192, 203, 0.5)" }}
        />
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            flexWrap: "wrap",
          }}
        >
          <p>Playtime (2 weeks) weight</p>
          <Tooltip title="Total Playtime info">
            <IconButton>
              <InfoIcon />
            </IconButton>
          </Tooltip>
        </div>
        <Slider
          value={sliderValues.playtime2Weeks}
          onChange={handleSliderChange("playtime2Weeks")}
          aria-label="Playtime (2 weeks) weight"
          defaultValue={0.5}
          getAriaValueText={valuetext}
          valueLabelDisplay="auto"
          shiftStep={0.1}
          step={0.1}
          marks={true}
          disabled={editWeights}
          min={-1}
          max={1}
          sx={{ color: "rgba(255, 192, 203, 0.5)" }}
        />
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
              preferredGenres: 0.5,
              ratings: 0.5,
              interest: 0.5,
              totalPlaytime: 0.5,
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
