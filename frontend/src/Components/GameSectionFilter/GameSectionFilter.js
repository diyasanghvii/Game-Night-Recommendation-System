import React, { useEffect, useState } from "react";
import "./GameSectionFilter.css";
import Btn from "../Button/Btn";
import RatingPopUp from "../RatingPopUp/RatingPopUp";
import {
  formatDate,
  gameRatingMatch,
  getOnlyUnRatedGames,
  getUnownedRatingValue,
  isGameOwned,
} from "../../Utils";
import GameInterestRating from "../GameInterestRating/GameInterestRating";
import { UpdateUnownedUserGameRating } from "../../Services";
import Switch from "@mui/material/Switch";
import CustomModal from "../Modal/CustomModal";
import OwnedGamesSorting from "../Sorting/OwnedGamesSorting";
import AllGamesFilter from "../GameFilter/AllGamesFilter";
import AllGamesSorting from "../Sorting/AllGamesSorting";

const fontClr = "#2d2d2e";

function GameSectionFilter({
  title,
  games,
  ratings,
  updateRatings,
  ownedGame,
  isSortable = false,
  allGamesFilter = false,
  hasFilter = false,
  fetchAllGamesWithFilter,
  loading,
  setGenreListInParent,
  setTagListInParent,
  setFeatureListInParent,
  clearFilterInParent,
}) {
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(5);
  const [showPopup, setShowPopup] = useState(false);
  const [popupGameData, setPopupGameData] = useState(null);
  const [onlyUnRatingChecked, setonlyRatingChecked] = useState(false);
  const [visibleGames, setvisibleGames] = useState([]);
  const [isSortingModalOpen, setIsSortingModalOpen] = useState(false);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [sortByOwned, setSortByOwned] = React.useState("Playtime forever");
  const [sortTypeOwned, setSortTypeOwned] = React.useState("asc");
  const [genreList, setGenreList] = React.useState("");
  const [tagsList, setTagsList] = React.useState("");
  const [featureList, setFeatureList] = React.useState("");
  const [isAllGamesSortingModalOpen, setIsAllGamesSortingModalOpen] =
    useState(false);

  const [sortByAllGames, setSortByAllGames] = React.useState("Release Date");
  const [sortTypeAllGames, setSortTypeAllGames] = React.useState("asc");

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
    setvisibleGames(games);
  }, [games]);

  useEffect(() => {
    if (onlyUnRatingChecked) {
      const filteredGames = getOnlyUnRatedGames(games, ratings);
      setvisibleGames(filteredGames);
    } else {
      setvisibleGames(games);
    }
  }, [games, startIndex, endIndex, onlyUnRatingChecked]);

  const openSortModal = () => {
    setIsSortingModalOpen(true);
  };

  const openFilterModal = () => {
    setIsFilterModalOpen(true);
  };

  const openAllGamesSortModal = () => {
    setIsAllGamesSortingModalOpen(true);
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
            return b.playtime_2weeks || 0 - a.playtime_2weeks || 0;
          }
        }
      });
      return filteredGames;
    });

    closeSortingModal();
  };

  const sortAllGames = (sortBy, sortType) => {
    setvisibleGames((prevValues) => {
      let filteredGames = games;
      if (onlyUnRatingChecked) {
        filteredGames = getOnlyUnRatedGames(games, ratings);
      }
      filteredGames.sort((a, b) => {
        if (sortType === "asc") {
          if (sortBy === "Release Date") {
            return a.releaseDate - b.releaseDate;
          } else if (sortBy === "Price") {
            return a.price - b.price;
          } else if (sortBy === "Review Score") {
            return a.reviewScore - b.reviewScore;
          }
        } else {
          if (sortBy === "Release Date") {
            return b.releaseDate - a.releaseDate;
          } else if (sortBy === "Price") {
            return b.price - a.price;
          } else if (sortBy === "Review Score") {
            return b.reviewScore - a.reviewScore;
          }
        }
      });
      return filteredGames;
    });
    closeSortingModal();
  };

  const closeSortingModal = () => {
    setIsSortingModalOpen(false);
    setIsFilterModalOpen(false);
    setIsAllGamesSortingModalOpen(false);
  };

  const handleGenreFilterChange = (event) => {
    const {
      target: { value },
    } = event;
    setGenreList(typeof value === "string" ? value.split(",") : value);
    setGenreListInParent(typeof value === "string" ? value.split(",") : value);
  };

  const handleChangeTagFilterList = (event) => {
    const {
      target: { value },
    } = event;
    setTagsList(typeof value === "string" ? value.split(",") : value);
    setTagListInParent(typeof value === "string" ? value.split(",") : value);
  };

  const handleChangeFeatureFilterList = (event) => {
    const {
      target: { value },
    } = event;
    setFeatureList(typeof value === "string" ? value.split(",") : value);
    setFeatureListInParent(
      typeof value === "string" ? value.split(",") : value
    );
  };

  const submitFilter = () => {
    setIsFilterModalOpen(false);
    fetchAllGamesWithFilter();
  };

  const clearFilter = () => {
    setGenreList([]);
    setFeatureList([]);
    setTagsList([]);
    clearFilterInParent();
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
        <h2 className="glow-header" style={{ marginRight: 20 }}>
          {title}
        </h2>
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
          <div style={{ marginRight: 10 }}>
            <Btn
              label="Sort"
              size="small"
              className="game-popup-button"
              onClick={allGamesFilter ? openAllGamesSortModal : openSortModal}
            />
          </div>
        )}
        {hasFilter && (
          <div>
            <Btn
              className="game-popup-button"
              label="Filter"
              size="small"
              onClick={openFilterModal}
            />
          </div>
        )}
        {loading && (
          <p style={{ marginLeft: 10, color: "white" }}>
            Loading filtered games ...
          </p>
        )}
      </div>
      <div className="gameCarousel">
        {/* <Btn
          fullWidth={true}
          label={"Prev"}
          onClick={handlePrev}
          disabled={startIndex === 0}
        /> */}
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
            <div style={{ height: 70 }}>
              <h3>{game.name}</h3>
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                margin: 0,
                padding: 0,
              }}
            >
              {game.price !== null && game.price !== undefined && (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    color: fontClr,
                  }}
                >
                  <h5
                    style={{
                      margin: 0,
                      marginBottom: 2,
                    }}
                  >
                    {"Price"}
                  </h5>
                  <h5
                    style={{
                      margin: 0,
                      marginBottom: 10,
                      color: "white",
                    }}
                  >
                    {game.price ? `$ ${game.price}` : "Free"}
                  </h5>
                </div>
              )}

              {game.reviewScore !== null && game.reviewScore !== undefined && (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <h5
                    style={{
                      margin: 0,
                      marginBottom: 2,
                      color: fontClr,
                    }}
                  >
                    {"Score"}
                  </h5>
                  <h5
                    style={{
                      margin: 0,
                      marginBottom: 10,
                    }}
                  >
                    {`${game.reviewScore}%`}
                  </h5>
                </div>
              )}

              {game.releaseDate !== null && game.releaseDate !== undefined && (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <h5
                    style={{
                      margin: 0,
                      marginBottom: 2,
                      color: fontClr,
                    }}
                  >
                    {"Release"}
                  </h5>
                  <h5
                    style={{
                      margin: 0,
                      marginBottom: 10,
                    }}
                  >
                    {formatDate(game.releaseDate)}
                  </h5>
                </div>
              )}
            </div>

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
      <div>
        {/* <Btn
          fullWidth={true}
          label={"Next"}
          onClick={handleNext}
          disabled={endIndex === games.length}
        /> */}
        <CustomModal
          title={"Sort Games"}
          open={isSortingModalOpen}
          handleClose={closeSortingModal}
          bodyComponent={
            <OwnedGamesSorting
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
        <CustomModal
          title={"Filter Games"}
          open={isFilterModalOpen}
          handleClose={closeSortingModal}
          bodyComponent={
            <AllGamesFilter
              sx={{
                backgroundColor: "#07294a",
                color: "#fff",
              }}
              genreList={genreList}
              tagsList={tagsList}
              featureList={featureList}
              submitFilter={() => {
                submitFilter();
              }}
              clearFilter={() => {
                clearFilter();
              }}
              handleGenreChange={(data) => {
                handleGenreFilterChange(data);
              }}
              handleChangeTagList={(data) => {
                handleChangeTagFilterList(data);
              }}
              handleChangeFeatureList={(data) => {
                handleChangeFeatureFilterList(data);
              }}
            />
          }
        />
        <CustomModal
          title={"Sort Games"}
          open={isAllGamesSortingModalOpen}
          handleClose={closeSortingModal}
          bodyComponent={
            <AllGamesSorting
              sortBy={sortByAllGames}
              sortType={sortTypeAllGames}
              submitSort={(value1, value2) => {
                sortAllGames(value1, value2);
              }}
              sortByChanged={(data) => {
                setSortByAllGames(data);
              }}
              sortTypeChanged={(data) => {
                setSortTypeAllGames(data);
              }}
            />
          }
        />
      </div>
    </section>
  );
}

export default GameSectionFilter;
