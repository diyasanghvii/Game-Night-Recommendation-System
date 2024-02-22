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
        .then((data) =>
          this.setState({ games: data.response.games, isLoading: false })
        )
        .catch((error) => this.setState({ error, isLoading: false }));
    }
  };

  componentDidUpdate() {}

  render() {
    const { userDetails, games, isLoading, error } = this.state;
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
          <span>
            <Btn label={"Recommend Multiplayer Games"} />
          </span>
        </div>

        {error ? (
          <p>Error fetching data. Please check your API key and Steam ID.</p>
        ) : isLoading ? (
          <p>Loading game data...</p>
        ) : (
          <div>
            <GameSection title="Your games" games={games} />
            <GameSectionFilter title="All games" games={games} />
          </div>
        )}
      </div>
    );
  }
}

export default EditPreferences;
