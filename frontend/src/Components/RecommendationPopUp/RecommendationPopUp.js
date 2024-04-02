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
    <Dialog open={true} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        <strong>Recommendations for your group</strong>
        <IconButton onClick={onClose} style={{ float: "right" }}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent>
        <TableContainer component={Paper} elevation={0}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <b>Game Name</b>
                </TableCell>
                <TableCell>
                  <b>Overall Score</b>
                </TableCell>
                <TableCell>
                  <b>Top Contributing Factor</b>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {recommendations?.map((recommendation) => (
                <TableRow key={recommendation.gameSteamId}>
                  <TableCell>{recommendation.gameName}</TableCell>
                  <TableCell>{(recommendation.totalScore * 10).toFixed(2)} / 10</TableCell>
                  <TableCell>{recommendation.reason}</TableCell>
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
