import React from "react";
import Select from "@mui/material/Select";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Btn from "../Button/Btn";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";

const names = [
  "Action",
  "Adventure",
  "Casual",
  "Free to Play",
  "Indie",
  "Massively Multiplayer",
  "RPG",
  "Racing",
  "Simulation",
  "Sports",
  "Strategy",
];

const tags = [
  "Asynchronous Multiplayer",
  "Local Multiplayer",
  "Massively Multiplayer",
  "Multiplayer",
  "Co-op",
];

const features = [
  "Cross-Platform Multiplayer",
  "Online Co-op",
  "MMO",
  "Remote Play Together",
  "Shared/Split Screen Co-op",
];

export default function AllGamesFilter({
  submitFilter,
  handleGenreChange,
  handleChangeTagList,
  handleChangeFeatureList,
  genreList,
  tagsList,
  featureList,
  clearFilter,
}) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        component="form"
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <FormControl sx={{ m: 1, width: 400 }}>
          <InputLabel id="genre-checkbox-label">Genre</InputLabel>
          <Select
            id="genre-checkbox"
            multiple
            value={genreList}
            onChange={handleGenreChange}
            input={<OutlinedInput label="Genres" />}
            renderValue={(selected) => selected.join(", ")}
          >
            {names.map((name) => (
              <MenuItem key={name} value={name}>
                <Checkbox checked={genreList.indexOf(name) > -1} />
                <ListItemText primary={name} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl sx={{ m: 1, width: 400 }}>
          <InputLabel id="tagsList-checkbox-label">Tags</InputLabel>
          <Select
            id="tagsList-checkbox"
            multiple
            value={tagsList}
            onChange={handleChangeTagList}
            input={<OutlinedInput label="Tags" />}
            renderValue={(selected) => selected.join(", ")}
          >
            {tags.map((tag) => (
              <MenuItem key={tag} value={tag}>
                <Checkbox checked={tagsList.indexOf(tag) > -1} />
                <ListItemText primary={tag} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl sx={{ m: 1, width: 400 }}>
          <InputLabel id="feature-checkbox-label">Features</InputLabel>
          <Select
            id="feature-checkbox"
            multiple
            value={featureList}
            onChange={handleChangeFeatureList}
            input={<OutlinedInput label="Features" />}
            renderValue={(selected) => selected.join(", ")}
          >
            {features.map((feature) => (
              <MenuItem key={feature} value={feature}>
                <Checkbox checked={featureList.indexOf(feature) > -1} />
                <ListItemText primary={feature} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <div style={{ marginTop: 20 }}></div>
      <div style={{ marginTop: 20, display: "flex", flexDirection: "row" }}>
        <div style={{ marginRight: 20 }}>
          <Btn label={"Clear All"} onClick={() => clearFilter()} />
        </div>
        <Btn label={"Submit"} onClick={() => submitFilter()} />
      </div>
    </div>
  );
}
