import React from "react";
import Select from "@mui/material/Select";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Btn from "../Button/Btn";
import ListItemText from "@mui/material/ListItemText";

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
    <Box
      sx={{
        backgroundColor: "rgb(78, 63, 105)",
        color: "#fff",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
      }}
    >
      <FormControl sx={{ m: 1, width: 400 }}>
        <InputLabel id="genre-checkbox-label" sx={{
              color: "white",
              "&.Mui-focused": {
                color: "#fff",
              },
            }}>
          Genre
        </InputLabel>
        <Select
          id="genre-checkbox"
          value={genreList}
          onChange={handleGenreChange}
          input={<OutlinedInput label="Genres" />}
          sx={{
            color: "#fff",
            "& .MuiSelect-icon": {
              color: "#fff",
            },
            "& .MuiSelect-selectMenu": {
              backgroundColor: "rgb(78, 63, 105)",
              color: "#fff",
            },
            "& .Mui-selected": {
              backgroundColor: "#4dabf5",
              color: "#000",
            },
          }}
          MenuProps={{
            anchorOrigin: {
              vertical: "bottom",
              horizontal: "left",
            },
            transformOrigin: {
              vertical: "top",
              horizontal: "left",
            },
            getContentAnchorEl: null,
            PaperProps: {
              sx: {
                backgroundColor: "rgb(78, 63, 105)", // Background color for menu list
              },
            },
          }}
        >
          {names.map((name) => (
            <MenuItem
              key={name}
              value={name}
              sx={{
                
                color: "white",
                "&.Mui-selected": {
                  backgroundColor: "#868387",
                },
                "&.Mui-selected:hover": {
                  backgroundColor: "#868387",
                },
                "&:hover": {
                  backgroundColor: "rgba(134, 131, 135, 0.4)",
                },
                borderBottom: "1px solid rgba(134, 131, 135, 0.4)",
              }}
            >
              <ListItemText primary={name} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl sx={{ m: 1, width: 400 }}>
        <InputLabel id="tagsList-checkbox-label" sx={{
              color: "white",
              "&.Mui-focused": {
                color: "#fff",
              },
            }}>
          Tags
        </InputLabel>
        <Select
          id="tagsList-checkbox"
          value={tagsList}
          onChange={handleChangeTagList}
          input={<OutlinedInput label="Tags" />}
          sx={{
            color: "#fff",
            "& .MuiSelect-icon": {
              color: "#fff",
            },
            "& .MuiSelect-selectMenu": {
              backgroundColor: "rgb(78, 63, 105)",
              color: "#fff",
            },
            "& .Mui-selected": {
              backgroundColor: "#4dabf5",
              color: "#000",
            },
          }}
          MenuProps={{
            anchorOrigin: {
              vertical: "bottom",
              horizontal: "left",
            },
            transformOrigin: {
              vertical: "top",
              horizontal: "left",
            },
            getContentAnchorEl: null,
            PaperProps: {
              sx: {
                backgroundColor: "rgb(78, 63, 105)", // Background color for menu list
              },
            },
          }}
        >
          {tags.map((tag) => (
            <MenuItem
              key={tag}
              value={tag}
              sx={{
                
                color: "white",
                "&.Mui-selected": {
                  backgroundColor: "#868387",
                },
                "&.Mui-selected:hover": {
                  backgroundColor: "#868387",
                },
                "&:hover": {
                  backgroundColor: "rgba(134, 131, 135, 0.4)",
                },
                borderBottom: "1px solid rgba(134, 131, 135, 0.4)",
              }}
            >
              <ListItemText primary={tag} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl sx={{ m: 1, width: 400 }}>
        <InputLabel id="feature-checkbox-label" sx={{
              color: "white",
              "&.Mui-focused": {
                color: "#fff",
              },
            }}>
          Features
        </InputLabel>
        <Select
          id="feature-checkbox"
          value={featureList}
          onChange={handleChangeFeatureList}
          input={<OutlinedInput label="Features" />}
          sx={{
            color: "#fff",
            "& .MuiSelect-icon": {
              color: "#fff",
            },
            "& .MuiSelect-selectMenu": {
              backgroundColor: "rgb(78, 63, 105)",
              color: "#fff",
            },
            "& .Mui-selected": {
              backgroundColor: "#4dabf5",
              color: "#000",
            },
          }}
          MenuProps={{
            anchorOrigin: {
              vertical: "bottom",
              horizontal: "left",
            },
            transformOrigin: {
              vertical: "top",
              horizontal: "left",
            },
            getContentAnchorEl: null,
            PaperProps: {
              sx: {
                backgroundColor: "rgb(78, 63, 105)", // Background color for menu list
              },
            },
          }}
        >
          {features.map((feature) => (
            <MenuItem
              key={feature}
              value={feature}
              
              sx={{
                
                color: "white",
                "&.Mui-selected": {
                  backgroundColor: "#868387",
                },
                "&.Mui-selected:hover": {
                  backgroundColor: "#868387",
                },
                "&:hover": {
                  backgroundColor: "rgba(134, 131, 135, 0.4)",
                },
                borderBottom: "1px solid rgba(134, 131, 135, 0.4)",
              }}
            >
              <ListItemText primary={feature} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <div style={{ marginTop: 20 }}></div>
      <div style={{ marginTop: 20, display: "flex", flexDirection: "row" }}>
        <div style={{ marginRight: 20 }}>
          <Btn label={"Clear All"} onClick={clearFilter} />
        </div>
        <Btn label={"Submit"} onClick={submitFilter} />
      </div>
    </Box>
  );
}
