import * as React from "react";
import Snackbar from "@mui/material/Snackbar";

export default function MessageBar({ open, handleClose, message }) {
  return (
    <Snackbar
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      open={open}
      autoHideDuration={5000}
      onClose={handleClose}
      message={message}
    />
  );
}
