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
            "linear-gradient(to right, #66a6ff, #3366ff), linear-gradient(to right, #66a6ff, #3366ff)",
          boxShadow:
            "0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08)",
          color: "white",
          transition: "background-color 0.3s ease",
          "&:hover": {
            background:
              "linear-gradient(to right, #66a6ff, #3366ff), linear-gradient(to right, #66a6ff, #3366ff)",
            boxShadow:
              "0 4px 6px rgba(0, 0, 0, 0.15), 0 1px 3px rgba(0, 0, 0, 0.12)",
          },
        }}
      >
        {label}
      </Button>
    </div>
  );
}

export default Btn;
