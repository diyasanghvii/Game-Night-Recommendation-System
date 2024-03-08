import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import Rating from "@mui/material/Rating";
import Tooltip from "@mui/material/Tooltip";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Btn from "../Button/Btn";

const GameInterestRating = ({
  isOwned,
  userRating,
  isEnabled,
  handleRatingSubmit,
}) => {
  const [interest, setInterest] = useState("");

  const handleInterestClick = (interestType) => {
    // Toggle interest selection
    const newInterest = interest === interestType ? "" : interestType;
    setInterest(newInterest);
  };

  return (
    <Typography variant="body1">
      <span className="icon-container">
        {isOwned ? (
          <>
            {isEnabled && <strong display>Rate it:</strong>}
            <Rating value={userRating} disabled={!isEnabled} />
            {isEnabled && (
              <Btn
                style={{ marginLeft: "5px", float: "right" }}
                label={"Save"}
                onClick={handleRatingSubmit}
              />
            )}
          </>
        ) : (
          <>
            {isEnabled && <strong>Interested?</strong>}
            <div style={{ display: "flex", alignItems: "center" }}>
              <Tooltip title="Interesting!">
                <ThumbUpIcon
                  style={{
                    marginLeft: "5px",
                    marginRight: "10px",
                    color: interest === "interesting" ? "green" : "inherit",
                  }}
                  onClick={() => handleInterestClick("interesting")}
                />
              </Tooltip>
              <Tooltip title="Love this!!">
                <FavoriteIcon
                  style={{
                    marginRight: "10px",
                    color: interest === "love" ? "red" : "inherit",
                  }}
                  onClick={() => handleInterestClick("love")}
                />
              </Tooltip>
              <Tooltip title="Meh -_-">
                <ThumbDownIcon
                  style={{
                    color: interest === "meh" ? "orange" : "inherit",
                  }}
                  onClick={() => handleInterestClick("meh")}
                />
              </Tooltip>
            </div>
          </>
        )}
      </span>
    </Typography>
  );
};

export default GameInterestRating;
