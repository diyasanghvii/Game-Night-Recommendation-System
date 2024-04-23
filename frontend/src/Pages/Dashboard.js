import React, { Component } from "react";
import steamService from "../Services/steamService";
import MenuHeader from "../Components/MenuHeader/MenuHeader";
import GameSection from "../Components/GameSection/GameSection";
import { FetchAllGames, FetchFreeGames, GetUserDetails } from "../Services";
import Btn from "../Components/Button/Btn";
import { Navigate } from "react-router-dom";
import _ from "lodash";
import { profileCheck } from "../Services";
import GameSectionFilter from "../Components/GameSectionFilter/GameSectionFilter";
import { TextField, InputAdornment, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

class Dashboard extends Component {
  constructor() {
    super();
    this.state = {
      backendResponse: "",
      ownedGames: [],
      filteredOwnedGames: [],
      ratings: [],
      isLoading: false,
      isAllGamesLoading: false,
      isLoadingAllFilterGames: false,
      isFreeGamesLoading: false,
      error: null,
      rcmBtnClicked: false,
      allGamesSearchTerm: "",
      freeGamesSearchTerm: "",
      yourGamesSearchTerm: "",
      allGamesList: [],
      freeGamesList: [],
      allGamesGenreFilter: [],
      allGamesTagFilter: [],
      allGamesFeaturesFilter: [],
    };
  }

  componentDidMount() {
    const token = sessionStorage.getItem("authToken");
    profileCheck(token);
    this.setState({ isLoading: true, isAllGamesLoading: true }, () => {
      this.getUserDetails();
      this.fetchAllGames();
      this.fetchFreeGames();
    });
  }

  fetchAllGames1 = () => {
    const { allGamesSearchTerm } = this.state;
    const defaultUrl =
      "https://api.gamalytic.com/steam-games/list?fields=name,steamId,price,reviewScore,releaseDate&limit=25&features=Cross-Platform%20Multiplayer";
    FetchAllGames({
      url: allGamesSearchTerm === "" ? defaultUrl : undefined,
      searchString: allGamesSearchTerm,
    })
      .then((response) => {
        if (response && response.data && response.data.result) {
          const updatedData = response.data.result.map((ele) => {
            return {
              ...ele,
              appid: ele.steamId,
            };
          });
          this.setState({
            allGamesList: updatedData,
            isAllGamesLoading: false,
          });
        }
      })
      .catch((error) => {
        console.log("Error : ", error);
        this.setState({ isAllGamesLoading: false });
      });
  };

  fetchAllGames = () => {
    const {
      allGamesSearchTerm,
      allGamesFeaturesFilter,
      allGamesTagFilter,
      allGamesGenreFilter,
    } = this.state;

    let defaultUrl =
      "https://api.gamalytic.com/steam-games/list?fields=name,steamId,price,reviewScore,releaseDate&limit=50";

    if (allGamesSearchTerm !== "") {
      defaultUrl += `&title=${allGamesSearchTerm}`;
    }
    if (allGamesGenreFilter.length > 0) {
      defaultUrl += `&genres=${allGamesGenreFilter.join(",")}`;
    }
    if (allGamesTagFilter.length > 0) {
      defaultUrl += `&tags=${allGamesTagFilter.join(",")}`;
    }
    if (allGamesFeaturesFilter.length > 0) {
      defaultUrl += `&features=${allGamesFeaturesFilter.join(",")}`;
    }
    this.setState({ isLoadingAllFilterGames: true });
    FetchAllGames({
      url: defaultUrl,
    })
      .then((response) => {
        if (response && response.data && response.data.result) {
          const updatedData = response.data.result.map((ele) => {
            return {
              ...ele,
              appid: ele.steamId,
            };
          });
          this.setState({
            allGamesList: updatedData,
            isLoadingAllFilterGames: false,
            isAllGamesLoading: false,
          });
        }
      })
      .catch((error) => {
        this.setState({
          isLoadingAllFilterGames: false,
          isAllGamesLoading: false,
        });
      });
  };

  fetchFreeGames = () => {
    const { freeGamesSearchTerm } = this.state;
    const defaultUrl =
      "https://api.gamalytic.com/steam-games/list?fields=name,steamId,price,reviewScore,releaseDate&limit=50&genres=Free%20to%20Play&features=Cross-Platform%20Multiplayer";
    FetchFreeGames({
      url: freeGamesSearchTerm === "" ? defaultUrl : undefined,
      searchString: freeGamesSearchTerm,
    })
      .then((response) => {
        if (response && response.data && response.data.result) {
          const updatedData = response.data.result.map((ele) => {
            return {
              ...ele,
              appid: ele.steamId,
            };
          });
          this.setState({
            freeGamesList: updatedData,
            isFreeGamesLoading: false,
          });
        }
      })
      .catch((error) => {
        console.log("Error : ", error);
        this.setState({ isFreeGamesLoading: false });
      });
  };

  getUserDetails = () => {
    GetUserDetails()
      .then((response) => {
        if (response && response.data) {
          localStorage.setItem("userName", response.data?.name);
          localStorage.setItem("userGenre", response.data?.preferredGenres);
          localStorage.setItem(
            "discordUserName",
            response.data?.discordUserName
          );
          this.setState({ ratings: response.data.preferences });
          this.fetchSteamData(response);
        }
      })
      .catch(() => {
        this.setState({ isLoading: false });
      });
  };

  fetchSteamData = () => {
    steamService
      .getOwnedGames()
      .then((response) => {
        this.setState({
          ownedGames: response.data.steamGames,
          filteredOwnedGames: response.data.steamGames,
          isLoading: false,
        });
      })
      .catch((error) => this.setState({ error, isLoading: false }));
  };

  updateRatings = (newRatings) => {
    this.setState({ ratings: newRatings });
  };

  debouncedFetchAllGames = _.debounce(() => {
    this.fetchAllGames();
  }, 500);

  debouncedFetchFreeGames = _.debounce(() => {
    this.fetchFreeGames();
  }, 500);

  handleAllGamesSearchChange = (event) => {
    this.setState({ allGamesSearchTerm: event.target.value }, () => {
      this.debouncedFetchAllGames();
    });
  };

  handleFreeGamesSearchChange = (event) => {
    this.setState({ freeGamesSearchTerm: event.target.value }, () => {
      this.debouncedFetchFreeGames();
    });
  };

  handleYourGamesSearchChange = (e) => {
    const searchTerm = e.target.value || "";
    this.setState({ yourGamesSearchTerm: searchTerm }, () => {
      const { ownedGames } = this.state;
      if (searchTerm === "") {
        this.setState({
          filteredOwnedGames: ownedGames,
        });
      } else {
        const filteredGames = ownedGames.filter((game) =>
          game.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        this.setState({
          filteredOwnedGames: filteredGames,
        });
      }
    });
  };

  render() {
    const {
      ownedGames,
      isLoading,
      error,
      ratings,
      rcmBtnClicked,
      allGamesSearchTerm,
      allGamesList,
      isAllGamesLoading,
      yourGamesSearchTerm,
      filteredOwnedGames,
      freeGamesList,
      isFreeGamesLoading,
      freeGamesSearchTerm,
      isLoadingAllFilterGames,
    } = this.state;
    const userName = localStorage.getItem("userName");
    return (
      <>
        <div
          className="all-root"
          style={{
            backgroundImage: "url('/images/Game Image.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            minHeight: "100vh",
            // padding: "20px",
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
                  marginTop: "35px",
                  color: "white",
                }}
              >
                <h2 style={{ marginLeft: 10 }} class="glow">
                  Welcome, {userName}!
                </h2>
                <span>
                  {rcmBtnClicked && (
                    <Navigate to="/recommend-games" replace={true} />
                  )}
                  <Btn
                    onClick={() => this.setState({ rcmBtnClicked: true })}
                    label={"Recommend Multiplayer Games"}
                    customStyle={{ backgroundColor: "rgba(0, 0, 0, 1)" }} // Adjust the button transparency here
                  />
                </span>
              </div>

              {isAllGamesLoading ? (
                <p style={{ color: "white" }}>Loading All games data...</p>
              ) : (
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
                    placeholder="Search all games..."
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
                          <IconButton
                            aria-label="search"
                            sx={{ color: "#fff" }}
                          >
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
                  <GameSectionFilter
                    title="All games"
                    allGamesFilter={true}
                    games={allGamesList}
                    isSortable={true}
                    ownedGame={ownedGames}
                    searchTerm={allGamesSearchTerm}
                    ratings={ratings}
                    updateRatings={this.updateRatings}
                    fetchAllGamesWithFilter={this.fetchAllGames}
                    hasFilter={true}
                    loading={isLoadingAllFilterGames}
                    setGenreListInParent={(data) => {
                      this.setState({ allGamesGenreFilter: data });
                    }}
                    setTagListInParent={(data) => {
                      this.setState({ allGamesTagFilter: data });
                    }}
                    setFeatureListInParent={(data) => {
                      this.setState({ allGamesFeaturesFilter: data });
                    }}
                    clearFilterInParent={() => {
                      this.setState({
                        allGamesGenreFilter: [],
                        allGamesTagFilter: [],
                        allGamesFeaturesFilter: [],
                      });
                    }}
                    backgroundColor="rgba(0, 0, 0, 0.5)"
                  />
                </div>
              )}

              {error ? (
                <p style={{ color: "white" }}>
                  Error fetching data. Please check your API key and Steam ID.
                </p>
              ) : isLoading ? (
                <p style={{ color: "white" }}>Loading game data...</p>
              ) : (
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
                    placeholder="Search your steam games..."
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
                          <IconButton
                            aria-label="search"
                            sx={{ color: "#fff" }}
                          >
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
                  <GameSectionFilter
                    title="Your games"
                    games={filteredOwnedGames}
                    isSortable={true}
                    isOwned={true}
                    ownedGame={ownedGames}
                    searchTerm={yourGamesSearchTerm}
                    onSearchChange={this.handleYourGamesSearchChange}
                    ratings={ratings}
                    updateRatings={this.updateRatings}
                    backgroundColor="rgba(0, 0, 0, 0.5)"
                  />
                </div>
              )}

              {isFreeGamesLoading ? (
                <p>Loading Free games data...</p>
              ) : (
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
                    placeholder="Search free games..."
                    value={freeGamesSearchTerm}
                    onChange={this.handleFreeGamesSearchChange}
                    fullWidth
                    style={{
                      width: "20%", // Adjust the width as needed, such as "50%" for half-width
                      height: "30px", // Adjust the height as needed, for example "30px"
                      marginBottom: "15px", // Add margin if desired
                    }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <IconButton
                            aria-label="search"
                            sx={{ color: "#fff" }}
                          >
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
                  <GameSectionFilter
                    title="Free Cross Platform Multi-Player games"
                    games={freeGamesList}
                    ownedGame={ownedGames}
                    searchTerm={allGamesSearchTerm}
                    onSearchChange={this.handleFreeGamesSearchChange}
                    ratings={ratings}
                    updateRatings={this.updateRatings}
                    backgroundColor="rgba(0, 0, 0, 0.5)"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Dashboard;
