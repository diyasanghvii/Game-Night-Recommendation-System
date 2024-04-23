import React, { Component } from "react";
import steamService from "../Services/steamService";
import MenuHeader from "../Components/MenuHeader/MenuHeader";
import GameSectionFilter from "../Components/GameSectionFilter/GameSectionFilter";
import GameSection from "../Components/GameSection/GameSection";
import PopupGenre from "../Components/PopupGenre/PopupGenre";
import { TextField, InputAdornment, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import {
  UpdateUserGenre,
  profileCheck,
  GetUserRatings,
  UpdateUnownedUserGameRating,
} from "../Services";
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
      allGames: [],
      yourGames: [], //owned games from steam
      allYourGames: [], //filtered owned games
      allGamesSearchTerm: "",
      yourGamesSearchTerm: "",
      ratedGames: [],
      allRatedGames: [],
      allInterestedGames: [],
      interestedGames: [],
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
        // Filter rated games from all games based on ratings
        /*const ratedGames = this.state.allYourGames.filter((game) =>
        this.checkIfGameIsRated(game)
      );*/
        const updatedData = response.data.preferences.map((game) => ({
          ...game,
          appid: game.gameSteamId,
          name: game.gameName,
        }));
        const filterRatedGames = updatedData.filter(
          (obj) => obj.ratings != null
        );
        const filterInterestedGames = updatedData.filter(
          (obj) => obj.interest != null
        );
        this.setState({
          ratedGames: filterRatedGames,
          allRatedGames: filterRatedGames,
          interestedGames: filterInterestedGames,
          allInterestedGames: filterInterestedGames,
        });
      })
      .catch((error) => {
        console.log(error);
        alert("Failed to fetch user ratings");
      });
  };
  // Method to check if a game is rated
  checkIfGameIsRated = (game) => {
    const { ratings } = this.state;
    return ratings.some((rating) => rating.gameName === game.name);
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

  handleAllGamesSearchChange = (e) => {
    const searchTerm = e?.target?.value || "";
    this.setState({ allGamesSearchTerm: searchTerm }, () => {
      const { allInterestedGames } = this.state;
      if (searchTerm === "") {
        this.setState({
          interestedGames: allInterestedGames,
        });
      } else {
        const filterInterestedGames = allInterestedGames.filter((game) =>
          game.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        this.setState({
          interestedGames: filterInterestedGames,
        });
      }
    });
  };

  handleYourGamesSearchChange = (e) => {
    const searchTerm = e?.target?.value || "";
    this.setState({ yourGamesSearchTerm: searchTerm }, () => {
      const { allRatedGames } = this.state;
      if (searchTerm === "") {
        this.setState({
          ratedGames: allRatedGames,
        });
      } else {
        const filteredGames = allRatedGames.filter((game) =>
          game.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        this.setState({
          ratedGames: filteredGames,
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

  interestChanged = (data, value, game) => {
    const param = {
      gameName: game.name,
      gameSteamId: game.appid,
      interest: value,
    };
    UpdateUnownedUserGameRating(param)
      .then((response) => {
        if (response) {
          this.setState({ ratings: response.data.preferences });
        }
      })
      .catch((e) => {
        console.log("Error", e);
      });
  };

  render() {
    const {
      allGames,
      ratedGames,
      ratings,
      allGamesSearchTerm,
      yourGamesSearchTerm,
      allInterestedGames,
      interestedGames,
    } = this.state;

    const userName = localStorage.getItem("userName");
    const userGenre = localStorage.getItem("userGenre")?.split(",") || [];
    return (
      <div
        className="all-root"
        style={{
          backgroundImage: "url('/images/Game Image.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "100vh",
        }}
      >
        <div
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.7)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            minHeight: "100vh",
          }}
        >
          <MenuHeader />
          <div style={{ padding: 20 }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginTop: "20px",
                color: "white",
              }}
            >
              <h2 style={{ color: "white" }}>Welcome, {userName}!</h2>
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
              <div
                style={{
                  backgroundColor: "rgba(0, 0, 0, 0.5)",
                  padding: "20px",
                  borderRadius: "10px",
                  marginTop: "10px",
                }}
              >
                <TextField
                  type="text"
                  placeholder="Search interested games..."
                  value={allGamesSearchTerm}
                  onChange={this.handleAllGamesSearchChange}
                  fullWidth
                  style={{
                    width: "20%", // Adjust the width as needed, such as "50%" for half-width
                    height: "30px", // Adjust the height as needed, for example "30px"
                    marginBottom: "15px", // Add margin if desired
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <IconButton aria-label="search" sx={{ color: "#fff" }}>
                          <SearchIcon />
                        </IconButton>
                      </InputAdornment>
                    ),
                    style: {
                      backgroundColor: "rgba(64, 64, 64, 0.75)",
                      color: "#fff",
                    },
                  }}
                />
                <GameSection
                  title="Interested games"
                  games={interestedGames}
                  searchTerm={yourGamesSearchTerm}
                  ratings={ratings}
                  isOwned={false}
                  updateRatings={this.updateRatings}
                  onSearchChange={this.handleAllGamesSearchChange}
                  interestChanged={(data, value, game) =>
                    this.interestChanged(data, value, game)
                  }
                />
              </div>
              <div
                style={{
                  backgroundColor: "rgba(0, 0, 0, 0.5)",
                  padding: "20px",
                  borderRadius: "10px",
                  marginTop: "10px",
                }}
              >
                <TextField
                  type="text"
                  placeholder="Search rated games..."
                  value={yourGamesSearchTerm}
                  onChange={this.handleYourGamesSearchChange}
                  fullWidth
                  style={{
                    width: "20%", // Adjust the width as needed, such as "50%" for half-width
                    height: "30px", // Adjust the height as needed, for example "30px"
                    marginBottom: "15px", // Add margin if desired
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <IconButton aria-label="search" sx={{ color: "#fff" }}>
                          <SearchIcon />
                        </IconButton>
                      </InputAdornment>
                    ),
                    style: {
                      backgroundColor: "rgba(64, 64, 64, 0.75)",
                      color: "#fff",
                    },
                  }}
                />
                <GameSection
                  title="Rated games"
                  games={ratedGames}
                  searchTerm={yourGamesSearchTerm}
                  ratings={ratings}
                  updateRatings={this.updateRatings}
                  onSearchChange={this.handleYourGamesSearchChange}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default EditPreferences;
