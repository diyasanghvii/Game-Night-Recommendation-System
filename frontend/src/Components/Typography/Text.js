import React from "react";
import { Typography } from "@mui/material";

function Text({
  label,
  variant = "h4",
  gutterBottom = false,
  customStyle = {},
}) {
  return (
    <Typography
      variant={variant}
      gutterBottom={gutterBottom}
      style={{ color: "white", ...customStyle }}
    >
      {label}
    </Typography>
  );
}

export default Text;
