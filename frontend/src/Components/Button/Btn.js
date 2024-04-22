import React from "react";
import { Button } from "@mui/material";

function Btn({
  label,
  onClick,
  fullWidth = false,
  size = "medium",
  disable,
  customStyle = {},
  className = "",
}) {
  return (
    <div>
      <Button
        className={className}
        variant="contained"
        fullWidth={fullWidth}
        color="primary"
        size={size}
        onClick={onClick}
        disabled={disable}
        sx={{
          backgroundImage:
            "linear-gradient(to right, rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0.2))", // Metallic gradient
          backgroundColor: "rgba(0, 0, 0, 0.6)", // Black color with 60% transparency
          color: "white",
          transition: "background-image 0.3s ease, background-color 0.3s ease",
          "&:hover": {
            backgroundImage:
              "linear-gradient(to right, rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.3))", // Slightly brighter gradient on hover
            backgroundColor: "rgba(32, 32, 32, 0.8)", // Darker black color on hover
          },
          ...customStyle,
        }}
      >
        {label}
      </Button>
    </div>
  );
}

export default Btn;
