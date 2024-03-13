import React, { useState, useEffect } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import CloseIcon from "@mui/icons-material/Close";
import Rating from "@mui/material/Rating";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import StarIcon from "@mui/icons-material/Star";

import FavoriteIcon from "@mui/icons-material/Favorite";
import Tooltip from "@mui/material/Tooltip";
import "./RatingPopUp.css";
import Btn from "../Button/Btn";
import { UpdateUserRating } from "../../Services";

import searchService from "../../Services/searchService";
import { INTERESTING, LOVE, MEH } from "../../Utils";

const RatingPopUp = ({
  gameId,
  gameName,
  gameRating,
  onClose,
  isOwned,
  updateRatings,
  interestChanged,
}) => {
  const [gameData, setGameData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [userRating, setUserRating] = useState(gameRating);
  const [saveMessage, setSaveMessage] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        let response;
        if (gameId) {
          response = await searchService.getGameDetails(gameId);
          setGameData(response.data.game);
        } else {
          return;
        }
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [gameId, gameName, onClose, isOwned]);

  const handleRatingSubmit = async () => {
    try {
      const newpreference = {
        gameSteamId: gameId,
        gameName: gameName,
        ratings: userRating,
      };
      const data = {
        preference: newpreference,
      };

      UpdateUserRating(data)
        .then((response) => {
          if (response && response.data) {
            setSaveMessage("Rating saved successfully!");
            updateRatings(response.data.preferences);
          }
        })
        .catch((error) => {
          console.log(error);
          alert(error?.response?.data?.message);
          setSaveMessage(
            error?.response?.data?.message ||
              "Error occurred while saving rating. Please try again."
          );
        });
    } catch (error) {
      console.error("Error submitting rating:", error);
      setSaveMessage("Error occurred while saving rating. Please try again.");
    }
  };

  const handleInterestClick = (interestType) => {
    interestChanged(interestType);
  };

  return (
    <Dialog open={true} onClose={onClose} maxWidth="sm" fullWidth>
      <div
        style={{
          backgroundImage: `url(${gameData?.["background"]})`,
          opacity: 1,
        }}
      >
        <DialogTitle style={{ color: "white", opacity: 1 }}>
          <strong>{gameData?.name}</strong>
          <IconButton onClick={onClose} style={{ float: "right" }}>
            <CloseIcon sx={{ color: "white" }} />
          </IconButton>
        </DialogTitle>

        <DialogContent
          style={{
            opacity: 1,
          }}
        >
          {isLoading && <p>Loading game details...</p>}
          {error && <p>Error fetching data: {error.message}</p>}
          {!isLoading && !error && gameData && (
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <img
                  src={gameData?.["header_image"]}
                  alt={gameData?.name}
                  style={{ maxWidth: "100%" }}
                />
              </Grid>

              <Grid item xs={12}>
                {gameData && gameData.short_description ? (
                  <Typography sx={{ color: "white" }} variant="body1">
                    <strong>Description:</strong> {gameData.short_description}
                  </Typography>
                ) : (
                  <p></p>
                )}
                <Typography sx={{ color: "white" }} variant="body1">
                  <strong>Genres:</strong>
                  {gameData?.genres.map((genre) => (
                    <span
                      key={genre.id}
                      className="tag"
                      style={{ marginRight: "5px" }}
                    >
                      {genre.description}
                    </span>
                  ))}
                </Typography>
                <hr />
                <Typography sx={{ color: "white" }} variant="body1">
                  <strong>Categories:</strong>
                  {gameData?.categories.map((categories) => (
                    <span
                      key={categories.id}
                      className="tag"
                      style={{ marginRight: "5px" }}
                    >
                      {categories.description}
                    </span>
                  ))}
                </Typography>
                <hr />

                {isOwned ? (
                  <Typography variant="body1" sx={{ color: "white" }}>
                    <span className="icon-container">
                      <strong>Rate it:</strong>
                      <Rating
                        name="game-rating"
                        value={userRating}
                        onChange={(event, newValue) => setUserRating(newValue)}
                        data-testid="rating-component"
                      />
                      <Btn
                        style={{ marginLeft: "5px", float: "right" }}
                        label={"Save"}
                        onClick={handleRatingSubmit}
                      />
                    </span>
                  </Typography>
                ) : (
                  <Typography sx={{ color: "white" }} variant="body1">
                    <strong>Interested?</strong>
                    <Tooltip title="Love this!!">
                      <FavoriteIcon
                        style={{
                          marginLeft: "5px",
                          marginRight: "10px",
                          color: gameRating === LOVE ? "red" : "inherit",
                        }}
                        onClick={() => handleInterestClick("love")}
                      />
                    </Tooltip>
                    <Tooltip title="Interesting!">
                      <ThumbUpIcon
                        style={{
                          marginRight: "10px",
                          color:
                            gameRating === INTERESTING ? "green" : "inherit",
                        }}
                        onClick={() => handleInterestClick("interesting")}
                      />
                    </Tooltip>
                    <Tooltip title="Meh -_-">
                      <ThumbDownIcon
                        style={{
                          color: gameRating && gameRating <= MEH ? "orange" : "inherit",
                        }}
                        onClick={() => handleInterestClick("meh")}
                      />
                    </Tooltip>
                  </Typography>
                )}
              </Grid>
            </Grid>
          )}
        </DialogContent>
      </div>
    </Dialog>
  );
};

export default RatingPopUp;
