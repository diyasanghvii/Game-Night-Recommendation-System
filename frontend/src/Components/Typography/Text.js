import React from "react";
import { Typography } from "@mui/material";

function Text({ label, variant = "h4", gutterBottom = false }) {
  return (
    <Typography variant={variant} gutterBottom={gutterBottom} style={{ color: "white" }}>
      {label}
    </Typography>
  );
}

export default Text;
