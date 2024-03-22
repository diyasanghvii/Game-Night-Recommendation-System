import React, { Component } from "react";
import steamService from "../Services/steamService";
import MenuHeader from "../Components/MenuHeader/MenuHeader";
import GameSection from "../Components/GameSection/GameSection";
import { FetchAllGames, GetUserDetails } from "../Services";
import Btn from "../Components/Button/Btn";
import { Navigate } from "react-router-dom";
import _ from "lodash";
import { profileCheck } from "../Services";
import GameSectionFilter from "../Components/GameSectionFilter/GameSectionFilter";

class Dashboard extends Component {
  constructor() {
    super();
    this.state = {
      backendResponse: "",
      ownedGames: [],
      ratings: [],
      isLoading: false,
      isAllGamesLoading: false,
      error: null,
      rcmBtnClicked: false,
      allGamesSearchTerm: "",
      allGamesList: [],
    };
  }

  componentDidMount() {
    const token = sessionStorage.getItem("authToken");
    profileCheck(token);
    this.setState({ isLoading: true, isAllGamesLoading: true }, () => {
      this.getUserDetails();
      this.fetchAllGames();
    });
  }

  fetchAllGames = () => {
    const { allGamesSearchTerm } = this.state;
    const defaultUrl =
      "https://api.gamalytic.com/steam-games/list?fields=name,steamId&limit=25&features=Cross-Platform%20Multiplayer";
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

  handleAllGamesSearchChange = (event) => {
    this.setState({ allGamesSearchTerm: event.target.value }, () => {
      this.debouncedFetchAllGames();
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
          <span>
            {rcmBtnClicked && <Navigate to="/recommend-games" replace={true} />}
            <Btn
              onClick={() => this.setState({ rcmBtnClicked: true })}
              label={"Recommend Multiplayer Games"}
            />
          </span>
        </div>

        {isAllGamesLoading ? (
          <p>Loading All games data...</p>
        ) : (
          <div>
            <input
              type="text"
              placeholder="Search all games..."
              value={allGamesSearchTerm}
              onChange={this.handleAllGamesSearchChange}
            />
            <GameSectionFilter
              title="All games"
              games={allGamesList}
              ownedGame={ownedGames}
              searchTerm={allGamesSearchTerm}
              onSearchChange={this.handleAllGamesSearchChange}
              ratings={ratings}
              updateRatings={this.updateRatings}
            />
          </div>
        )}

        {error ? (
          <p>Error fetching data. Please check your API key and Steam ID.</p>
        ) : isLoading ? (
          <p>Loading game data...</p>
        ) : (
          <div>
            <GameSection
              title="Your games"
              games={ownedGames}
              ratings={ratings}
              updateRatings={this.updateRatings}
            />
          </div>
        )}
      </div>
    );
  }
}

export default Dashboard;
