import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Btn from "../Button/Btn";
import { SendList } from "../../Services";

const RecommendationPopup = ({
  recommendations,
  selectedChannel,
  selectedServer,
  selectedMembers,
  onClose,
}) => {
  return (
    <Dialog open={true} onClose={onClose} maxWidth="sm" fullWidth PaperProps={{
      style: {
        backgroundColor: '#1A2040',
      },
    }}>
      <DialogTitle sx={{ color: "#fff" }}>
        <strong>Recommendations for your group</strong>
        <IconButton onClick={onClose} style={{ float: "right", color:"#fff" }}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent>  
        <TableContainer component={Paper} elevation={0} sx={{ backgroundColor: "#1A2040" }}>
          <Table sx={{ backgroundColor: "#242c53" }}>
            <TableHead>
              <TableRow>
                <TableCell sx={{ color: "#fff" }}>
                  <b>Rank</b>
                </TableCell>
                <TableCell sx={{ color: "#fff" }}>
                  <b>Game Name</b>
                </TableCell>
                <TableCell sx={{ color: "#fff" }}>
                  <b>Top Contributing Factor(s)</b>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {recommendations?.map((recommendation, index) => (
                <TableRow key={recommendation.gameSteamId}>
                  <TableCell sx={{ color: "#fff" }}>{index+1}</TableCell>
                  <TableCell sx={{ color: "#fff" }}>{recommendation.gameName}</TableCell>
                  <TableCell sx={{ color: "#fff" }}>{recommendation.reason}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </DialogContent>
      <div style={{ display: "flex", alignSelf: "center", marginBottom: "15px" }}>
        <Btn
          label={"Send List to " + selectedServer + " (" + selectedChannel + ")"}
          onClick={() =>
            SendList({ selectedChannel, selectedServer, selectedMembers, recommendations })
          }
        />
      </div>
    </Dialog>
  );
};

export default RecommendationPopup;
