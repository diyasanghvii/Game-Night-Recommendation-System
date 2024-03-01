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

import FavoriteIcon from "@mui/icons-material/Favorite";
import Tooltip from "@mui/material/Tooltip";
import axios from "axios";
import { alignProperty } from "@mui/material/styles/cssUtils";
import "./RatingPopUp.css";
import Btn from "../Button/Btn";
import { UpdateUserRating } from "../../Services";

import rawgService, {
  getAllGamesBySearch,
  getGameDetails,
} from "../../Services/rawgService";

const RatingPopUp = ({
  gameId,
  gameRawgId,
  gameName,
  gameRating,
  onClose,
  isOwned,
  updateRatings,
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
        if (gameRawgId) {
          response = await rawgService.getGameDetails(gameRawgId);
          setGameData(response.data.game);
        } else if (gameId) {
          response = await rawgService.getAllGamesBySearch(gameName);
          setGameData(response.data.games[0]);
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
  }, [gameId, gameRawgId, gameName, onClose, isOwned]);

  const handleRatingSubmit = async () => {
    try {
      const newpreference = {
        gameSteamId: gameId,
        gameRawgId: gameRawgId,
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
      console.log("Error2");
      console.error("Error submitting rating:", error);
      setSaveMessage("Error occurred while saving rating. Please try again.");
    }
  };

  return (
    <Dialog open={true} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        <strong>{gameData?.name}</strong>
        <IconButton onClick={onClose} style={{ float: "right" }}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent>
        {isLoading && <p>Loading game details...</p>}
        {error && <p>Error fetching data: {error.message}</p>}
        {!isLoading && !error && gameData && (
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <img
                src={gameData?.["background_image"]}
                alt={gameData?.name}
                style={{ maxWidth: "100%" }}
              />
            </Grid>

            <Grid item xs={12}>
              {gameData && gameData.description ? (
                <Typography variant="body1">
                  <strong>Description:</strong> {gameData.description}
                </Typography>
              ) : (
                <p></p>
              )}
              <Typography variant="body1">
                <strong>Genres:</strong>
                {gameData?.genres.map((genre) => (
                  <span
                    key={genre.id}
                    className="tag"
                    style={{ marginRight: "5px" }}
                  >
                    {genre.name}
                  </span>
                ))}
              </Typography>
              <hr />
              <Typography variant="body1">
                <strong>Tags:</strong>
                {gameData?.tags
                  .filter((tag) => tag.language === "eng")
                  .map((tag) => (
                    <span
                      key={tag.id}
                      className="tag"
                      style={{ marginRight: "5px" }}
                    >
                      {tag.name}
                    </span>
                  ))}
              </Typography>
              <hr />

              {isOwned ? (
                <Typography variant="body1">
                  <span className="icon-container">
                    <strong>Rate it:</strong>
                    <Rating
                      name="game-rating"
                      value={userRating}
                      onChange={(event, newValue) => setUserRating(newValue)}
                    />
                    <Btn
                      style={{ marginLeft: "5px", float: "right" }}
                      label={"Save"}
                      onClick={handleRatingSubmit}
                    />
                  </span>
                </Typography>
              ) : (
                <Typography variant="body1">
                  <span className="icon-container">
                    <strong>Interested?</strong>
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
                  </span>
                </Typography>
              )}

              {saveMessage && (
                <Typography variant="body1">{saveMessage}</Typography>
              )}
            </Grid>
          </Grid>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default RatingPopUp;
