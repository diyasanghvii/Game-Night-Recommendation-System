import React, { useEffect, useState } from "react";
import "./GameSectionFilter.css";
import Btn from "../Button/Btn";
import RatingPopUp from "../RatingPopUp/RatingPopUp";
import {
  gameRatingMatch,
  getOnlyUnRatedGames,
  getUnownedRatingValue,
  isGameOwned,
} from "../../Utils";
import GameInterestRating from "../GameInterestRating/GameInterestRating";
import { UpdateUnownedUserGameRating } from "../../Services";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import CustomModal from "../Modal/CustomModal";
import AllGamesSorting from "../Sorting/AllGamesSorting";

function GameSectionFilter({
  title,
  games,
  ratings,
  updateRatings,
  isOwned,
  ownedGame,
  sortGames,
  isSortable = false,
}) {
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(5);
  const [showPopup, setShowPopup] = useState(false);
  const [popupGameData, setPopupGameData] = useState(null);
  const [onlyUnRatingChecked, setonlyRatingChecked] = useState(false);
  const [visibleGames, setvisibleGames] = useState([]);
  const [isSortingModalOpen, setIsSortingModalOpen] = useState(false);
  const [sortByOwned, setSortByOwned] = React.useState("Playtime forever");
  const [sortTypeOwned, setSortTypeOwned] = React.useState("asc");

  const handleClick = (game) => {
    setPopupGameData(game);
    setShowPopup(true);
  };

  const handleNext = () => {
    setStartIndex((prev) => Math.min(prev + 5, games.length - 5));
    setEndIndex((prev) => Math.min(prev + 5, games.length));
  };

  const handlePrev = () => {
    setStartIndex((prev) => Math.max(prev - 5, 0));
    setEndIndex((prev) => Math.max(prev - 5, 5));
  };

  const interestChanged = (game, data) => {
    const param = {
      gameName: game.name,
      gameSteamId: game.appid,
      interest: getUnownedRatingValue(data),
    };
    UpdateUnownedUserGameRating(param)
      .then((response) => {
        if (response) {
          updateRatings(response?.data?.preferences);
        }
      })
      .catch((e) => {
        console.log("Error", e);
      });
  };

  const handleRatedToggleChange = (event) => {
    setonlyRatingChecked(event.target.checked);
  };

  useEffect(() => {
    setStartIndex(0);
    setEndIndex(5);
    setvisibleGames(games?.slice(startIndex, endIndex) || []);
  }, [games]);

  useEffect(() => {
    if (onlyUnRatingChecked) {
      const filteredGames = getOnlyUnRatedGames(games, ratings);
      setvisibleGames(filteredGames?.slice(startIndex, endIndex) || []);
    } else {
      setvisibleGames(games?.slice(startIndex, endIndex) || []);
    }
  }, [games, startIndex, endIndex, onlyUnRatingChecked]);

  const openModal = () => {
    setIsSortingModalOpen(true);
  };

  const sortOwnedGames = (sortBy, sortType) => {
    setvisibleGames((prevValues) => {
      let filteredGames = games;
      if (onlyUnRatingChecked) {
        filteredGames = getOnlyUnRatedGames(games, ratings);
      }
      filteredGames.sort((a, b) => {
        if (sortType === "asc") {
          if (sortBy === "Playtime forever") {
            return a.playtime_forever - b.playtime_forever;
          } else {
            return a.playtime_2weeks || 0 - b.playtime_2weeks || 0;
          }
        } else {
          if (sortBy === "Playtime forever") {
            return b.playtime_forever - a.playtime_forever;
          } else {
            console.log("reached here");
            return b.playtime_2weeks || 0 - a.playtime_2weeks || 0;
          }
        }
      });
      console.log(filteredGames);
      return filteredGames;
    });

    closeSortingModal();
  };

  const closeSortingModal = () => {
    setIsSortingModalOpen(false);
  };

  return (
    <section className="gameSection">
      {showPopup && (
        <RatingPopUp
          gameId={popupGameData.appid}
          gameName={popupGameData.name}
          gameRating={gameRatingMatch(
            ratings,
            popupGameData.name,
            popupGameData.appid,
            null
          )}
          interestChanged={(data) => interestChanged(popupGameData, data)}
          onClose={() => setShowPopup(false)}
          isOwned={isGameOwned(ownedGame, popupGameData)}
          updateRatings={updateRatings}
        />
      )}
      <div
        style={{ display: "flex", flexDirection: "row", alignItems: "center" }}
      >
        <h2 style={{ marginRight: 20 }}>{title}</h2>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Switch
            checked={onlyUnRatingChecked}
            onChange={handleRatedToggleChange}
            defaultChecked
          />
          <p style={{ marginRight: 20 }}>Show only unrated games</p>
        </div>
        {isSortable && (
          <div>
            <Btn label="Sort" size="small" onClick={openModal} />
          </div>
        )}
      </div>
      <div className="gameCarousel">
        <Btn
          fullWidth={true}
          label={"Prev"}
          onClick={handlePrev}
          disabled={startIndex === 0}
        />
        <div className="gameList">
          {visibleGames.map((game, index) => (
            <div
              className="gameCard"
              key={index}
              onClick={() => handleClick(game)}
            >
              <img
                style={{ width: 200, height: 100 }}
                src={`https://steamcdn-a.akamaihd.net/steam/apps/${game.appid}/header.jpg`}
                alt={game.name}
              />
              <h3>{game.name}</h3>

              {isGameOwned(ownedGame, game) ? (
                <GameInterestRating
                  isOwned={true}
                  userRating={gameRatingMatch(
                    ratings,
                    game.name,
                    game.appid,
                    game.appid
                  )}
                  isEnabled={false}
                />
              ) : (
                <GameInterestRating
                  userRating={gameRatingMatch(
                    ratings,
                    game.name,
                    game.appid,
                    null
                  )}
                  interestChanged={(data) => {}}
                  isOwned={false}
                  isEnabled={false}
                />
              )}
            </div>
          ))}
        </div>
        <Btn
          fullWidth={true}
          label={"Next"}
          onClick={handleNext}
          disabled={endIndex === games.length}
        />
        <CustomModal
          title={"Sort Games"}
          open={isSortingModalOpen}
          handleClose={closeSortingModal}
          bodyComponent={
            <AllGamesSorting
              sortBy={sortByOwned}
              sortType={sortTypeOwned}
              submitSort={(value1, value2) => {
                sortOwnedGames(value1, value2);
              }}
              sortByChanged={(data) => {
                setSortByOwned(data);
              }}
              sortTypeChanged={(data) => {
                setSortTypeOwned(data);
              }}
            />
          }
        />
      </div>
    </section>
  );
}

export default GameSectionFilter;
