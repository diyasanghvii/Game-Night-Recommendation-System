import React, { Component } from "react";
import steamService from '../Services/steamService';

//import { profileCheck } from "../Services";

class Dashboard extends Component {
  constructor() {
    super();
    this.state = {
      backendResponse: "",
      games: [],
      isLoading: false,
      error: null


      /*
      TODO:
      Call http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key={{API_KEY}}&steamid=76561198807764656&format=json&include_appinfo=True&include_played_free_games=True
      to get a response like the one below and populate the game url images from this response onto the dashboard
      {
    "response": {
        "game_count": 3,
        "games": [
            {
                "appid": 230410,
                "name": "Warframe",
                "playtime_forever": 0,
                "img_icon_url": "22064646470f4c53388ba87774c7ac10f0a91ffa",
                "has_community_visible_stats": true,
                "playtime_windows_forever": 0,
                "playtime_mac_forever": 0,
                "playtime_linux_forever": 0,
                "rtime_last_played": 0,
                "content_descriptorids": [
                    2,
                    5
                ],
                "playtime_disconnected": 0
            },
            {
                "appid": 242760,
                "name": "The Forest",
                "playtime_forever": 207,
                "img_icon_url": "3a6847f6ac5879e48531db52261771d5e22904ac",
                "has_community_visible_stats": true,
                "playtime_windows_forever": 207,
                "playtime_mac_forever": 0,
                "playtime_linux_forever": 0,
                "rtime_last_played": 1701515831,
                "content_descriptorids": [
                    2,
                    5
                ],
                "playtime_disconnected": 0
            },
            {
                "appid": 252950,
                "name": "Rocket League",
                "playtime_forever": 622,
                "img_icon_url": "9ad6dd3d173523354385955b5fb2af87639c4163",
                "has_community_visible_stats": true,
                "playtime_windows_forever": 622,
                "playtime_mac_forever": 0,
                "playtime_linux_forever": 0,
                "rtime_last_played": 1658156419,
                "playtime_disconnected": 0
            },
            {
                "appid": 431960,
                "name": "Wallpaper Engine",
                "playtime_2weeks": 270,
                "playtime_forever": 2547,
                "img_icon_url": "72edaed9d748c6cf7397ffb1c83f0b837b9ebd9d",
                "has_community_visible_stats": true,
                "playtime_windows_forever": 2547,
                "playtime_mac_forever": 0,
                "playtime_linux_forever": 0,
                "rtime_last_played": 1707710002,
                "playtime_disconnected": 0
            }
          ]
        }
      }
      */
    };
  }

  componentDidMount() {
    // const token = sessionStorage.getItem("authToken");
    // profileCheck(token)
    //   .then(() => {})
    //   .catch(() => {});
    
    
    const apiKey = process.env.STEAM_API_KEY;
    console.log(apiKey);
    const steamId = '76561198807764656';
    this.setState({ isLoading: true });

    steamService.getOwnedGames(apiKey, steamId)
    .then((response) => response.json())
    .then((data) =>
      this.setState({ games: data.response.games, isLoading: false })
    )
    .catch((error) => this.setState({ error, isLoading: false }));
    
  };

  render() {
    const { games, isLoading, error } = this.state;

    return (
      <div>
        <p>DASHBOARD</p>

        {error ? (
          <p>Error fetching data. Please check your API key and Steam ID.</p>
        ) : isLoading ? (
          <p>Loading game data...</p>
        ) : (
          <div className="game-grid">
            {games.map((game) => (
              <div className="game-card" key={game.appid}>
                <img
                  src={`http://media.steampowered.com/steamcommunity/public/images/apps/${game.appid}/${game.img_icon_url}.jpg`}
                  alt={game.name}
                />
                <h3>{game.name}</h3>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }
}

export default Dashboard;
