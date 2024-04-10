import React from "react";
import Button from "@mui/material/Button";

function Btn({ label, onClick, fullWidth = false, size = "medium" }) {
  return (
    <div>
      <Button
        variant="contained"
        fullWidth={fullWidth}
        color="primary"
        size={size}
        onClick={onClick}
      >
        {label}
      </Button>
    </div>
  );
}

export default Btn;