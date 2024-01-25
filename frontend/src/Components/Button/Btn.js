import React from "react";
import Button from "@mui/material/Button";

function Btn({ label, onClick }) {
  return (
    <div>
      <Button variant="contained" color="primary" onClick={onClick}>
        {label}
      </Button>
    </div>
  );
}

export default Btn;
