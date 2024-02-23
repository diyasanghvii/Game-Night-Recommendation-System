import React, { Component } from "react";
import steamService from "../Services/steamService";
import MenuHeader from "../Components/MenuHeader/MenuHeader";
import GameSectionFilter from "../Components/GameSectionFilter/GameSectionFilter";
import GameSection from "../Components/GameSection/GameSection";
import { GetUserDetails } from "../Services";
import Btn from "../Components/Button/Btn";

import { profileCheck } from "../Services";

class EditPreferences extends Component {
  constructor() {
    super();
    this.state = {
      backendResponse: "",
      userDetails: {},
      games: [],
      isLoading: false,
      error: null,
      allGames: [],
      yourGames: [],
      allGamesSearchTerm: "",
      yourGamesSearchTerm: "",
    };
  }

  componentDidMount() {
    const token = sessionStorage.getItem("authToken");
    profileCheck(token)
      .then(() => {})
      .catch(() => {});
    this.setState({ isLoading: true }, () => {
      this.getUserDetails();
    });
  }

  getUserDetails = () => {
    GetUserDetails()
      .then((response) => {
        if (response && response.data) {
          this.setState({ userDetails: response.data });
          this.fetchSteamData(response);
        }
      })
      .catch(() => {
        this.setState({ isLoading: false });
      });
  };

  fetchSteamData = (response) => {
    if (response.data?.steamId) {
      steamService
        .getOwnedGames(
          process.env.REACT_APP_STEAM_API_KEY,
          response.data?.steamId
        )
        .then((data) => {
          const games = data.response.games;
          this.setState({ games, allGames: games, isLoading: false });
        })
        .catch((error) => this.setState({ error, isLoading: false }));
    }
  };

  handleAllGamesSearchChange = (e) => {
    const searchTerm = e.target.value;
    const { allGames } = this.state;
    const filteredGames = allGames.filter(game =>
      game.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    this.setState({ allGamesSearchTerm: searchTerm, games: filteredGames });
  };

  handleYourGamesSearchChange = (e) => {
    const searchTerm = e.target.value;
    const { yourGames } = this.state;
    const filteredGames = yourGames.filter(game =>
      game.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    this.setState({ yourGamesSearchTerm: searchTerm, yourGames: filteredGames });
  };

  render() {
    const { userDetails, games, isLoading, error, allGames, yourGames, allGamesSearchTerm, yourGamesSearchTerm } = this.state;

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
          <h2>Welcome, {userDetails?.name}!</h2>
          
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
              <GameSectionFilter title="All games" games={allGames} searchTerm={allGamesSearchTerm} onSearchChange={this.handleAllGamesSearchChange} />
            </div>
            <div>
              <input
                type="text"
                placeholder="Search your games..."
                value={yourGamesSearchTerm}
                onChange={this.handleYourGamesSearchChange}
              />
              <GameSection title="Your games" games={yourGames} searchTerm={yourGamesSearchTerm} onSearchChange={this.handleYourGamesSearchChange} />
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default EditPreferences;
