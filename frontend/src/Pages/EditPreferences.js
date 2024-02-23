import React, { Component } from "react";
import steamService from "../Services/steamService";
import MenuHeader from "../Components/MenuHeader/MenuHeader";
import GameSectionFilter from "../Components/GameSectionFilter/GameSectionFilter";
import GameSection from "../Components/GameSection/GameSection";
import { GetUserDetails } from "../Services";
import Btn from "../Components/Button/Btn";
import Popup from "../Components/Popup/Popup"; // Import the Popup component
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
      genres: [], // State to store selected genres
      isPopupOpen: false, // State to control the visibility of the popup
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

  handleEditGenre = () => {
    // Function to handle the click event of the "Edit Genre" button
    this.setState({ isPopupOpen: true });
  };

  handleClosePopup = () => {
    // Function to handle closing the popup
    this.setState({ isPopupOpen: false });
  };

  handleGenreSelection = (selectedGenres) => {
    // Function to handle genre selection from the popup
    this.setState({ genres: selectedGenres, isPopupOpen: false });
  };

  componentDidUpdate() {}

  render() {
    const { userDetails, games, isLoading, error, genres, isPopupOpen } = this.state;
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
          
          {/* Render the popup if isPopupOpen is true */}
          {isPopupOpen && (
            <Popup genres={genres} onClose={this.handleClosePopup} onSelection={this.handleGenreSelection}
            />
          )}
        </div>

        {error ? (
          <p>Error fetching data. Please check your API key and Steam ID.</p>
        ) : isLoading ? (
          <p>Loading game data...</p>
        ) : (
          <div>
            <GameSectionGenre title="Preferred Genres"games={games}
             onEditGenre={this.handleEditGenre} // Pass the handler function to GameSectionFilter
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
