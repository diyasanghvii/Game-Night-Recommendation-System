import React, { useState } from "react";
import "./GameSection.css";
import Btn from "../Button/Btn";
import RatingPopUp from "../RatingPopUp/RatingPopUp";
import { gameRatingMatch } from "../../Utils";
import GameInterestRating from "../GameInterestRating/GameInterestRating";

function GameSection({ title, games, ratings, updateRatings }) {
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(5);
  const [showPopup, setShowPopup] = useState(false);
  const [popupGameData, setPopupGameData] = useState(null);

  const handleClick = (game) => {
    setPopupGameData(game);
    setShowPopup(true);
  };

  const handleNext = () => {
    setStartIndex((prev) => Math.min(prev + 5, games?.length - 5));
    setEndIndex((prev) => Math.min(prev + 5, games?.length));
  };

  const handlePrev = () => {
    setStartIndex((prev) => Math.max(prev - 5, 0));
    setEndIndex((prev) => Math.max(prev - 5, 5));
  };
  const ratedGames = games.filter((game) =>
    gameRatingMatch(ratings, game.name, game.appid, null)
  );

  const visibleGames = ratedGames?.slice(startIndex, endIndex) || [];
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
          onClose={() => setShowPopup(false)}
          isOwned={true}
          updateRatings={updateRatings}
        />
      )}
      <h2>{title}</h2>
      {visibleGames.length > 0 ? (
        <div className="gameCarousel">
          <Btn
            fullWidth={true}
            label={"Prev"}
            onClick={handlePrev}
            disabled={startIndex === 0}
          />
          <div className="gameList">
            {visibleGames.map((game) => (
              <div
                className="gameCard"
                key={game.appid}
                onClick={() => handleClick(game)}
              >
                <img
                  style={{ width: 200, height: 100 }}
                  src={`https://steamcdn-a.akamaihd.net/steam/apps/${game.appid}/header.jpg`}
                  alt={game.name}
                />
                <h3>{game.name}</h3>

                {ratings && (
                  <GameInterestRating
                    isOwned={true}
                    userRating={gameRatingMatch(
                      ratings,
                      game.gameName,
                      game.appid,
                      null
                    )}
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
            disabled={endIndex === ratedGames?.length}
          />
        </div>
      ) : (
        <h3>No Rated Games Found</h3>
      )}
    </section>
  );
}

export default GameSection;
