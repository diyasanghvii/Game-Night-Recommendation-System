import React from "react";
import Select from "@mui/material/Select";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Btn from "../Button/Btn";

export default function OwnedGamesSorting({
  sortBy,
  sortType,
  submitSort,
  sortByChanged,
  sortTypeChanged,
}) {
  const handleChange = (event) => {
    sortByChanged(event.target.value);
  };

  const handleSortTypeChange = (event) => {
    sortTypeChanged(event.target.value);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box component="form" sx={{ display: "flex", flexWrap: "wrap" }}>
        <FormControl sx={{ m: 1, minWidth: 160 }}>
          <InputLabel
            sx={{
              color: "white",
              "&.Mui-focused": {
                color: "#fff",
              },
            }}
            id="server-dialog-select-label"
          >
            Sort By
          </InputLabel>
          <Select
            labelId="server-dialog-select-label"
            id="server-dialog-select"
            value={sortBy}
            onChange={handleChange}
            input={
              <OutlinedInput
                sx={{
                  color: "white",
                  "&.Mui-focused": {
                    color: "#fff",
                  },
                }}
                label="Sort By"
              />
            }
            sx={{
              color: "#fff",
              "& .MuiSelect-icon": {
                color: "#fff",
              },
              "& .MuiSelect-selectMenu": {
                backgroundColor: "#1A2040",
                color: "#fff",
              },
              "& .Mui-selected": {
                backgroundColor: "#424042",
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
            <MenuItem
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
              key={1}
              value={"Playtime forever"}
            >
              Playtime forever
            </MenuItem>
            <MenuItem
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
              }}
              key={2}
              value={"Playtime last 2 weeks"}
            >
              Playtime last 2 weeks
            </MenuItem>
          </Select>
        </FormControl>
      </Box>
      <div style={{ marginTop: 20 }}>
        <RadioGroup
          row
          aria-labelledby="demo-controlled-radio-buttons-group"
          name="controlled-radio-buttons-group"
          value={sortType}
          onChange={handleSortTypeChange}
        >
          <FormControlLabel
            sx={{
              color: "white",
            }}
            value="asc"
            control={
              <Radio
                sx={{
                  color: "white",
                  "&.Mui-checked": {
                    color: "white",
                  },
                  "&.Mui-checked:hover": {
                    color: "white",
                  },
                  "&:hover": {
                    color: "white",
                  },
                }}
              />
            }
            label="Ascending"
          />
          <FormControlLabel
            sx={{
              color: "white",
            }}
            value="desc"
            control={
              <Radio
                sx={{
                  color: "white",
                  "&.Mui-checked": {
                    color: "white",
                  },
                  "&.Mui-checked:hover": {
                    color: "white",
                  },
                  "&:hover": {
                    color: "white",
                  },
                }}
              />
            }
            label="Descending"
          />
        </RadioGroup>
      </div>
      <div style={{ marginTop: 20 }}>
        <Btn label={"Submit"} onClick={() => submitSort(sortBy, sortType)} />
      </div>
    </div>
  );
}
