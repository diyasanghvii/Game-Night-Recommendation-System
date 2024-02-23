import { authRequest } from ".";

export const getOwnedGames = () => {
  return new Promise((resolve, reject) => {
    authRequest
      .get("/steam/getusersteamgamelist")
      .then((response) => {
        console.log("Im here")
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
