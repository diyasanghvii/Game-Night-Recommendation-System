import React from "react";
import { Button } from "@mui/material";

function Btn({ label, onClick, fullWidth = false }) {
  return (
    <div>
      <Button
        variant="contained"
        fullWidth={fullWidth}
        color="primary"
        onClick={onClick}
        sx={{
          background:
            "linear-gradient(to right, #007BFF, #00BFFF), linear-gradient(to right, #4CAF50, #2E7D32)",
          boxShadow:
            "0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08)",
          color: "white",
          "&:hover": {
            background:
              "linear-gradient(to right, #007BFF, #00BFFF), linear-gradient(to right, #4CAF50, #2E7D32)",
          },
        }}
      >
        {label}
      </Button>
    </div>
  );
}

export default Btn;
