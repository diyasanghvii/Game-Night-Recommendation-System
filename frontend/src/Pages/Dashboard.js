import React, { Component } from "react";
import steamService from "../Services/steamService";
import MenuHeader from "../Components/MenuHeader/MenuHeader";
import GameSection from "../Components/GameSection/GameSection";
import { GetUserDetails } from "../Services";
import Btn from "../Components/Button/Btn";
import { Navigate } from "react-router-dom";

import { profileCheck } from "../Services";

class Dashboard extends Component {
  constructor() {
    super();
    this.state = {
      backendResponse: "",
      games: [],
      ratings: [],
      isLoading: false,
      error: null,
      rcmBtnClicked: false,
    };
  }

  componentDidMount() {
    const token = sessionStorage.getItem("authToken");
    profileCheck(token)
      .then(() => {
        this.setState({ isLoading: true }, () => {
          this.getUserDetails();
        });
      })
      .catch(() => {
        // Redirect to signup2 page if both steamId and discordUserName are null
        const steamId = localStorage.getItem("steamId");
        const discordUserName = localStorage.getItem("discordUserName");
        if (!steamId && !discordUserName) {
          window.location.href = "/signup2"; // Redirect to signup2 page
        }
      });
  }

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
        this.setState({ games: response.data.steamGames, isLoading: false });
      })
      .catch((error) => this.setState({ error, isLoading: false }));
  };

  updateRatings = (newRatings) => {
    this.setState({ ratings: newRatings });
  };

  componentDidUpdate() {}

  render() {
    const { games, isLoading, error, ratings, rcmBtnClicked } = this.state;
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

        {error ? (
          <p>Error fetching data. Please check your API key and Steam ID.</p>
        ) : isLoading ? (
          <p>Loading game data...</p>
        ) : (
          <div>
            <GameSection
              title="Your games"
              games={games}
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
