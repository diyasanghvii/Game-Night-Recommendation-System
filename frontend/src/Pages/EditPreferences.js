import React, { Component } from "react";
import steamService from "../Services/steamService";
import MenuHeader from "../Components/MenuHeader/MenuHeader";
import GameSectionFilter from "../Components/GameSectionFilter/GameSectionFilter";
import GameSection from "../Components/GameSection/GameSection";
import { GetUserDetails } from "../Services";
import Btn from "../Components/Button/Btn";
import PopupGenre from "../Components/PopupGenre/PopupGenre";
import { profileCheck } from "../Services";
import GameSectionGenre from "../Components/GameSectionGenre/GameSectionGenre";

class EditPreferences extends Component {
  constructor() {
    super();
    this.state = {
      backendResponse: "",
      userDetails: {},
      games: [],
      isLoading: false,
      error: null,
      genres: [],
      isPopupOpen: false,
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
    steamService
      .getOwnedGames()
      .then((response) => {
        this.setState({ games: response.data.steamGames, isLoading: false });
      })
      .catch((error) => this.setState({ error, isLoading: false }));
  };

  handleEditGenre = () => {
    this.setState({ isPopupOpen: true });
  };

  handleClosePopup = () => {
    this.setState({ isPopupOpen: false });
  };

  handleGenreSelection = (selectedGenres) => {
    this.setState({ genres: selectedGenres, isPopupOpen: false });
  };

  componentDidUpdate() {}

  render() {
    const { userDetails, games, isLoading, error, genres, isPopupOpen } =
      this.state;
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
          {isPopupOpen && (
            <PopupGenre
              genres={genres}
              onClose={this.handleClosePopup}
              onSelection={this.handleGenreSelection}
            />
          )}
        </div>

        {error ? (
          <p>Error fetching data. Please check your API key and Steam ID.</p>
        ) : isLoading ? (
          <p>Loading game data...</p>
        ) : (
          <div>
           <GameSectionGenre
          title="Preferred Genres"
          games={games}
          onEditGenre={this.handleEditGenre}
          genres={genres}
/>
            <GameSection title="Your games" games={games} />
            <GameSectionFilter title="All games" games={games} />
          </div>
        )}
      </div>
    );
  }
}

export default EditPreferences;
