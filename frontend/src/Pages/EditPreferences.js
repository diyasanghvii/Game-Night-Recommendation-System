import React, { Component } from "react";
import steamService from "../Services/steamService";
import MenuHeader from "../Components/MenuHeader/MenuHeader";
import GameSectionFilter from "../Components/GameSectionFilter/GameSectionFilter";
import GameSection from "../Components/GameSection/GameSection";
import PopupGenre from "../Components/PopupGenre/PopupGenre";
import { UpdateUserGenre, profileCheck, GetUserRatings } from "../Services";
import GameSectionGenre from "../Components/GameSectionGenre/GameSectionGenre";
import searchService from "../Services/searchService";

class EditPreferences extends Component {
  constructor() {
    super();
    this.state = {
      backendResponse: "",
      isLoading: false,
      error: null,
      genres: [],
      ratings: [],
      isPopupOpen: false,
      allGames: [], //all games from rawg
      yourGames: [], //owned games from steam
      allYourGames: [], //filtered owned games
      allGamesSearchTerm: "",
      yourGamesSearchTerm: "",
    };
  }

  componentDidMount() {
    const token = sessionStorage.getItem("authToken");
    profileCheck(token);
    this.setState({ isLoading: true }, () => {
      this.fetchSteamData();
      this.handleAllGamesSearchChange();
      this.fetchUserRatings();
    });
  }

  fetchSteamData = () => {
    steamService
      .getOwnedGames()
      .then((response) => {
        this.setState({
          allYourGames: response.data.steamGames,
          yourGames: response.data.steamGames,
          isLoading: false,
        });
      })
      .catch((error) => this.setState({ error, isLoading: false }));
  };

  fetchUserRatings = () => {
    GetUserRatings()
      .then((response) => {
        this.setState({ ratings: response.data.preferences });
      })
      .catch((error) => {
        console.log(error);
        alert("Failed to fetch user ratings");
      });
  };

  updateRatings = (newRatings) => {
    this.setState({ ratings: newRatings });
  };

  handleEditGenre = () => {
    this.setState({ isPopupOpen: true });
  };

  handleClosePopup = () => {
    this.setState({ isPopupOpen: false });
  };

  handleAllGamesSearchChange = async (e) => {
    const searchTerm = e?.target?.value || "";
    if (searchTerm === "") {
      this.setState({ allGamesSearchTerm: searchTerm }, async () => {
        const response = await searchService.getFeaturedGames();
        const updatedAllGames = response.data.games.data?.map(
          (steamAllGame) => {
            let isOwned;
            let gameSteamId;
            if (this.state.yourGames) {
              //TODO: Update search criteria since Rawg and Steam names can be different
              const ownedMatch = this.state.yourGames?.find(
                (myGame) => myGame.appid === steamAllGame.appid
              );

              isOwned = !!ownedMatch;
              gameSteamId = ownedMatch ? ownedMatch.appid : null;
            } else {
              const ownedMatch = this.state.allYourGames?.find(
                (ownedGame) => ownedGame.appid === steamAllGame.appid
              );

              isOwned = !!ownedMatch;
              gameSteamId = ownedMatch ? ownedMatch.appid : null;
            }

            return {
              ...steamAllGame,
              isOwned: isOwned ? 1 : 0,
              steamId: gameSteamId,
            };
          }
        );

        this.setState({ allGames: updatedAllGames });
      });
    } else {
      this.setState({ allGamesSearchTerm: searchTerm }, async () => {
        const response = await searchService.getAllGamesBySearch(searchTerm);
        const updatedAllGames = response.data?.games?.map((steamAllGame) => {
          let isOwned;
          let gameSteamId;
          if (this.state.yourGames) {
            const ownedMatch = this.state.yourGames?.find(
              (ownedGame) =>
                parseInt(ownedGame.appid) === parseInt(steamAllGame.appid)
            );

            isOwned = !!ownedMatch;
            gameSteamId = ownedMatch ? ownedMatch.appid : null;
          } else {
            const ownedMatch = this.state.allYourGames?.find(
              (ownedGame) => ownedGame.appid === steamAllGame.appid
            );

            isOwned = !!ownedMatch;
            gameSteamId = ownedMatch ? ownedMatch.appid : null;
          }

          return {
            ...steamAllGame,
            isOwned: isOwned ? 1 : 0,
            steamId: gameSteamId,
          };
        });

        this.setState({ allGames: updatedAllGames });
      });
    }
  };

  handleYourGamesSearchChange = (e) => {
    const searchTerm = e?.target?.value || "";
    this.setState({ yourGamesSearchTerm: searchTerm }, () => {
      const { allYourGames } = this.state;
      if (searchTerm === "") {
        this.setState({
          yourGames: allYourGames,
        });
      } else {
        const filteredGames = allYourGames.filter((game) =>
          game.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        this.setState({
          yourGames: filteredGames,
        });
      }
    });
  };

  handleGenreSelection = (selectedGenres) => {
    UpdateUserGenre({ preferredGenres: selectedGenres }).then((res) => {
      if (res && res.data && res.data.preferredGenres) {
        localStorage.setItem("userGenre", res.data.preferredGenres);
        this.setState({ genres: res.data.preferredGenres, isPopupOpen: false });
      }
    });
  };

  render() {
    const {
      allGames,
      yourGames,
      ratings,
      allGamesSearchTerm,
      yourGamesSearchTerm,
    } = this.state;

    const userName = localStorage.getItem("userName");
    const userGenre = localStorage.getItem("userGenre")?.split(",") || [];
    return (
      <div>
        <MenuHeader />
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: "17px",
          }}
        >
          <h2>Welcome, {userName}!</h2>
          {this.state.isPopupOpen && (
            <PopupGenre
              genres={userGenre}
              onClose={this.handleClosePopup}
              onSelection={this.handleGenreSelection}
            />
          )}
        </div>

        <div>
          <GameSectionGenre
            title="Preferred Genres"
            onEditGenre={this.handleEditGenre}
            genres={userGenre}
          />

          <div>
            <input
              type="text"
              placeholder="Search all games..."
              value={allGamesSearchTerm}
              onChange={this.handleAllGamesSearchChange}
            />
            <GameSectionFilter
              title="All games"
              games={allGames}
              searchTerm={allGamesSearchTerm}
              onSearchChange={this.handleAllGamesSearchChange}
              ratings={ratings}
              updateRatings={this.updateRatings}
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="Search rated games..."
              value={yourGamesSearchTerm}
              onChange={this.handleYourGamesSearchChange}
            />
            <GameSection
              title="Rated games"
              games={yourGames}
              searchTerm={yourGamesSearchTerm}
              ratings={ratings}
              updateRatings={this.updateRatings}
              onSearchChange={this.handleYourGamesSearchChange}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default EditPreferences;
