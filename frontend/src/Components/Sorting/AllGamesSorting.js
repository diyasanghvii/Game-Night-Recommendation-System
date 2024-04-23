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

export default function AllGamesSorting({
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
      <FormControl
        sx={{ m: 1, minWidth: 160, backgroundColor: "rgb(78, 63, 105)" }}
      >
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
          input={<OutlinedInput sx={{ color: "white" }} label="Sort By" />}
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
            value={"Release Date"}
          >
            Release Date
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
              borderBottom: "1px solid rgba(134, 131, 135, 0.4)",
            }}
            key={2}
            value={"Price"}
          >
            Price
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
            key={3}
            value={"Review Score"}
          >
            Review Score
          </MenuItem>
        </Select>
      </FormControl>
      <div style={{ marginTop: 20 }}>
        <RadioGroup
          row
          aria-labelledby="demo-controlled-radio-buttons-group"
          name="controlled-radio-buttons-group"
          value={sortType}
          onChange={handleSortTypeChange}
        >
          <FormControlLabel
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
    </Box>
  );
}
