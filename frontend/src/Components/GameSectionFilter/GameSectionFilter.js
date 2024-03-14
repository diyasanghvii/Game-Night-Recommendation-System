import React, { useState } from "react";
import "./GameSectionFilter.css";
import Btn from "../Button/Btn";
import RatingPopUp from "../RatingPopUp/RatingPopUp";
import { gameRatingMatch, getUnownedRatingValue } from "../../Utils";
import GameInterestRating from "../GameInterestRating/GameInterestRating";
import { UpdateUnownedUserGameRating } from "../../Services";

function GameSectionFilter({ title, games, ratings, updateRatings }) {
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(5);
  const [showPopup, setShowPopup] = useState(false);
  const [popupGameData, setPopupGameData] = useState(null);

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

  const visibleGames = games?.slice(startIndex, endIndex) || [];
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
          isOwned={popupGameData.isOwned}
          updateRatings={updateRatings}
        />
      )}
      <h2>{title}</h2>
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

              {ratings && game.isOwned ? (
                <GameInterestRating
                  isOwned={game.isOwned}
                  userRating={gameRatingMatch(
                    ratings,
                    game.name,
                    null,
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
      </div>
    </section>
  );
}

export default GameSectionFilter;
