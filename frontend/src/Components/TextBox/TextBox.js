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
      />
    </div>
  );
}

export default TextBox;
