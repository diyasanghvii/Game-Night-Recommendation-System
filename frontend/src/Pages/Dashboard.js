import React, { Component } from "react";
import steamService from '../Services/steamService';
import MenuHeader from '../Components/MenuHeader/MenuHeader'
import GameSection from "../Components/GameSection/GameSection";
import { GetUserDetails } from "../Services";
import Btn from "../Components/Button/Btn";

import { profileCheck } from "../Services";

class Dashboard extends Component {
  constructor() {
    super();
    this.state = {
      backendResponse: "",
      username: "",
      games: [],
      isLoading: false,
      error: null
    };
  }

  
  componentDidMount() {
    const token = sessionStorage.getItem("authToken");
    profileCheck(token)
      .then(() => {})
      .catch(() => {});
    
    //get logged in user's name and Steam ID
    GetUserDetails(token)
      .then((response) => this.setState({username: response.data.name}))
      // update getUserDetails to return steam id and set it here.
      .catch(() => {});

    const apiKey = process.env.REACT_APP_STEAM_API_KEY;
    const steamId = '76561198807764656';
    this.setState({ isLoading: true });

    steamService.getOwnedGames(apiKey, steamId)
    .then((data) => 
      this.setState({ games: data.response.games, isLoading: false })
    )
    .catch((error) => this.setState({ error, isLoading: false }));
    
  };

  componentDidUpdate() {
  }

  render() {
    const { username, games, isLoading, error } = this.state;

    return (
      <div>
        <MenuHeader />
        <div>Welcome, {username}!<Btn label={"Recommend Multiplayer Games"}/></div>

        {error ? (
          <p>Error fetching data. Please check your API key and Steam ID.</p>
        ) : isLoading ? (
          <p>Loading game data...</p>
        ) : (
          <div>
          <GameSection title="Your most played games" games={games} />
          <GameSection title="Your friends are playing" games={games} />
          <GameSection title="New Releases" games={games} />
          </div>
        )}
      </div>
    );
  }
}

export default Dashboard;
