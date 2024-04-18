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
        backgroundColor: "#07294a",
        color: "#fff",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
      }}
    >
      <FormControl sx={{ m: 1, minWidth: 160, backgroundColor: "#07294a" }}>
        <InputLabel id="server-dialog-select-label">Sort By</InputLabel>
        <Select
          labelId="server-dialog-select-label"
          id="server-dialog-select"
          value={sortBy}
          onChange={handleChange}
          input={<OutlinedInput label="Sort By" />}
          sx={{
            color: "#fff",
            "& .MuiSelect-icon": {
              color: "#fff",
            },
            "& .MuiSelect-selectMenu": {
              color: "#fff",
            },
            "& .Mui-selected": {
              backgroundColor: "#07294a",
              color: "#fff", // Text color changed to white
              "&:hover": {
                backgroundColor: "#07294a",
                color: "#fff",
              },
            },
            "&:hover": {
              backgroundColor: "#07294a",
              color: "#fff",
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
                backgroundColor: "#07294a", // Background color for menu list
                color: "#fff", // Text color for menu list items
              },
            },
          }}
        >
          <MenuItem key={1} value={"Release Date"}>
              Release Date
            </MenuItem>
            <MenuItem key={2} value={"Price"}>
            Price
          </MenuItem>
          <MenuItem key={3} value={"Review Score"}>
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
          sx={{
            backgroundColor: "#07294a",
            color: "#fff",
            "&.Mui-selected": {
              color: "#000",
            },
            "&:hover": {
              backgroundColor: "#07294a",
              color: "#000",
            },
          }}
          onChange={handleSortTypeChange}
        >
          <FormControlLabel value="asc" control={<Radio />} label="Asc" />
          <FormControlLabel value="desc" control={<Radio />} label="Desc" />
        </RadioGroup>
      </div>
      <div style={{ marginTop: 20 }}>
        <Btn label={"Submit"} onClick={() => submitSort(sortBy, sortType)} />
      </div>
    </Box>
  );
}
