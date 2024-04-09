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
          backgroundColor: "rgba(0, 0, 0, 0.5)", // Black color with 50% transparency
          color: "white",
          transition: "background-color 0.3s ease",
          "&:hover": {
            backgroundColor: "rgba(0, 0, 0, 0.6)", // Slightly darker black on hover
          },
        }}
      >
        {label}
      </Button>
    </div>
  );
}

export default Btn;
