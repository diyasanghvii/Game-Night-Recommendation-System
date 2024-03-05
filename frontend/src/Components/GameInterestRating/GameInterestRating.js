import React from "react";
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
            <Tooltip title="Interesting!">
              <ThumbUpIcon
                style={{
                  display: "inline-block",
                  marginLeft: "5px",
                  marginRight: "10px",
                }}
              />
            </Tooltip>
            <Tooltip title="Love this!!">
              <FavoriteIcon
                style={{ display: "inline-block", marginRight: "10px" }}
              />
            </Tooltip>
            <Tooltip title="Meh -_-">
              <ThumbDownIcon style={{ display: "inline-block" }} />
            </Tooltip>
          </>
        )}
      </span>
    </Typography>
  );
};

export default GameInterestRating;
