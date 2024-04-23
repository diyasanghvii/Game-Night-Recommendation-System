import * as React from "react";
import Text from "../Typography/Text";
import Modal from "@mui/material/Modal";
import { Box, Tooltip } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

export default function CustomModal({
  title = "title",
  open,
  handleClose,
  bodyComponent,
}) {
  return (
    <div>
      <Modal open={open} onClose={handleClose}>
        <Box className="modal-box" sx={{ backgroundColor: "rgb(78, 63, 105)", border: "4px solid #424042" }}>
          <div className="modal-containter-root">
            <div>
              <Text variant="h5" gutterBottom={true} label={title} />
            </div>
            <div className="modal-header-icon">
              <div>
                <Tooltip title={"Close"} placement="bottom">
                  <CloseIcon
                    className="icon-curser-pointer"
                    onClick={handleClose}
                    sx={{ color: "#fff" }} 
                  />
                </Tooltip>
              </div>
            </div>
          </div>
          <div className="modal-body-root">{bodyComponent}</div>
        </Box>
      </Modal>
    </div>
  );
}
