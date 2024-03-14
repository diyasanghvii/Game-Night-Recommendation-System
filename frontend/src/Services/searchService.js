import { authRequest } from ".";

export const getAllGamesBySearch = (gameName) => {
    return new Promise((resolve, reject) => {
      authRequest
        .get(`/search/getAllGames?gameName=${gameName}`)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

export const getGameDetails = (appid) => {
  return new Promise((resolve, reject) => {
    authRequest
      .get(`/search/getGameDetails?appid=${appid}`)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const getFeaturedGames = () => {
  return new Promise((resolve, reject) => {
    authRequest
      .get(`/search/getFeaturedGames`)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

const searchService = {
    getAllGamesBySearch,
    getGameDetails,
    getFeaturedGames
};

export default searchService;
