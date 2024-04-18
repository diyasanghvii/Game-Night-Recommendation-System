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
          <InputLabel id="server-dialog-select-label">Sort By</InputLabel>
          <Select
            labelId="server-dialog-select-label"
            id="server-dialog-select"
            value={sortBy}
            onChange={handleChange}
            input={<OutlinedInput label="Sort By" />}
          >
            <MenuItem key={1} value={"Playtime forever"}>
              Playtime forever
            </MenuItem>
            <MenuItem key={2} value={"Playtime last 2 weeks"}>
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
          <FormControlLabel value="asc" control={<Radio />} label="Asc" />
          <FormControlLabel value="desc" control={<Radio />} label="Desc" />
        </RadioGroup>
      </div>
      <div style={{ marginTop: 20 }}>
        <Btn label={"Submit"} onClick={() => submitSort(sortBy, sortType)} />
      </div>
    </div>
  );
}