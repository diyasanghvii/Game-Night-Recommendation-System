import axios from 'axios';

const BASE_URL = 'http://api.steampowered.com';

export const getOwnedGames = (apiKey, steamId) => {
  const url = `${BASE_URL}/IPlayerService/GetOwnedGames/v0001/?key=${apiKey}&steamid=${steamId}&format=json&include_appinfo=True&include_played_free_games=True`;

  return axios.get(url)
    .then(response => {
      return response.data;
    })
    .catch(error => {
      console.error('Error fetching Steam games:', error);
      throw error;
    });
};

const steamService = {
    getOwnedGames
  };

export default steamService; 
