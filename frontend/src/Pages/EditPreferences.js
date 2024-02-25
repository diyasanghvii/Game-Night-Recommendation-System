import React, { Component } from "react";
import steamService from "../Services/steamService";
import MenuHeader from "../Components/MenuHeader/MenuHeader";
import GameSectionFilter from "../Components/GameSectionFilter/GameSectionFilter";
import GameSection from "../Components/GameSection/GameSection";
import { profileCheck } from "../Services";
import rawgService from "../Services/rawgService";

class EditPreferences extends Component {
  constructor() {
    super();
    this.state = {
      backendResponse: "",
      isLoading: false,
      error: null,
      allGames: [],
      yourGames: [],
      allYourGames: [],
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

  handleAllGamesSearchChange = async (e) => {
    const searchTerm = e?.target?.value || "";
    this.setState({ allGamesSearchTerm: searchTerm }, async () => {
      const response = await rawgService.getAllGamesBySearch(searchTerm);
      this.setState({
        allGames: response.data?.games,
      });
    });
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

  render() {
    const {
      isLoading,
      error,
      allGames,
      yourGames,
      allGamesSearchTerm,
      yourGamesSearchTerm,
    } = this.state;
    const userName = localStorage.getItem("userName");
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
        </div>

        {error ? (
          <p>Error fetching data. Please check your API key and Steam ID.</p>
        ) : isLoading ? (
          <p>Loading game data...</p>
        ) : (
          <div>
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
              />
            </div>
            <div>
              <input
                type="text"
                placeholder="Search your games..."
                value={yourGamesSearchTerm}
                onChange={this.handleYourGamesSearchChange}
              />
              <GameSection
                title="Your games"
                games={yourGames}
                searchTerm={yourGamesSearchTerm}
                onSearchChange={this.handleYourGamesSearchChange}
              />
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default EditPreferences;
