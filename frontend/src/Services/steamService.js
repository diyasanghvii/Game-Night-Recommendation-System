import { authRequest } from ".";

export const getOwnedGames = () => {
  return new Promise((resolve, reject) => {
    authRequest
      .get("/steam/getusersteamgamelist")
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

const steamService = {
  getOwnedGames,
};

export default steamService;
