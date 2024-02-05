import React from "react";
import { Typography } from "@mui/material";

function Text({ label, variant = "h4", gutterBottom = false }) {
  return (
    <Typography variant={variant} gutterBottom={gutterBottom}>
      {label}
    </Typography>
  );
}

export default Text;
