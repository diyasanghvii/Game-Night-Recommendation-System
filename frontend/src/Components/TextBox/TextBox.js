import React from "react";
import TextField from "@mui/material/TextField";

function TextBox({
  label,
  value,
  variant = "outlined",
  onChange,
  type = "text",
  fullWidth = false,
}) {
  return (
    <div>
      <TextField
        margin="normal"
        label={label}
        fullWidth={fullWidth}
        value={value}
        type={type}
        variant={variant}
        onChange={onChange}
        InputLabelProps={{
          style: { color: "#fff" },
        }}
        sx={{
          "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
            borderColor: "white", // Change the border color to white
          },
          "& .MuiInputLabel-outlined": {
            color: "white", // Change the label color to white
          },
          "& .MuiOutlinedInput-input": {
            color: "white", // Change the input text color to white
          },
          "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "white", // Change the border color on hover to white
          },
          "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
            {
              borderColor: "white", // Change the border color on focus to white
            },
        }}
      />
    </div>
  );
}

export default TextBox;
