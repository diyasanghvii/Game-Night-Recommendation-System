import React from "react";
import Typography from "@mui/material/Typography";
import Rating from "@mui/material/Rating";
import Tooltip from "@mui/material/Tooltip";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Btn from "../Button/Btn";
import { INTERESTING, LOVE, MEH } from "../../Utils";

const GameInterestRating = ({
  isOwned,
  userRating,
  isEnabled,
  handleRatingSubmit,
  interestChanged,
  interest,
}) => {
  const handleInterestClick = (event, interestType) => {
    event.stopPropagation();
    const newInterest = interest === interestType ? "" : interestType;
    interestChanged(newInterest);
  };

  return (
    <Typography variant="body1">
      <span className="icon-container">
        {isOwned ? (
          <>
            {isEnabled && <strong display>Rate it:</strong>}
            <Rating
              value={userRating}
              disabled={!isEnabled}
              sx={{
                "& .MuiRating-iconFilled": {
                  color: "#FFFF00", // Filled star color
                  fontSize: "1.5rem !important",
                },
                "& .MuiRating-iconEmpty": {
                  color: "#ccc", // Empty star color
                  fontSize: "1.5rem !important",
                },
              }}
            />
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
              <Tooltip title="Love this!!">
                <FavoriteIcon
                  style={{
                    marginLeft: "5px",
                    marginRight: "10px",
                    color: userRating === LOVE ? "red" : "inherit",
                  }}
                  onClick={(e) => handleInterestClick(e, "interesting")}
                />
              </Tooltip>
              <Tooltip title="Interesting!">
                <ThumbUpIcon
                  style={{
                    marginRight: "10px",
                    color: userRating === INTERESTING ? "green" : "inherit",
                  }}
                  onClick={(e) => handleInterestClick(e, "love")}
                />
              </Tooltip>
              <Tooltip title="Meh -_-">
                <ThumbDownIcon
                  style={{
                    color:
                      userRating <= MEH && userRating !== null
                        ? "orange"
                        : "inherit",
                  }}
                  onClick={(e) => handleInterestClick(e, "meh")}
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
