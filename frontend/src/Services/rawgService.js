import { authRequest } from ".";

export const getAllGamesBySearch = (gameName) => {
    return new Promise((resolve, reject) => {
      authRequest
        .get(`/rawg/getAllGames?gameName=${gameName}`)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

export const getGameDetails = (gameRawgId) => {
  return new Promise((resolve, reject) => {
    authRequest
      .get(`/rawg/getGameDetails?gameRawgId=${gameRawgId}`)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

const rawgService = {
    getAllGamesBySearch,
    getGameDetails,
};

export default rawgService;
