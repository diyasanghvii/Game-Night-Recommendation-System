import React from "react";
import TextField from "@mui/material/TextField";

function TextBox({ label, variant = "outlined", onChange }) {
  return (
    <div>
      <TextField label={label} variant={variant} onChange={onChange} />
    </div>
  );
}

export default TextBox;
