import { GetUserDetails } from '../Services';

const getUserDetails = (callback) => {
  GetUserDetails()
    .then((response) => {
      if (response && response.data) {
        localStorage.setItem("userName", response.data.name);
        localStorage.setItem("userGenre", JSON.stringify(response.data.preferredGenres));
        localStorage.setItem("discordUserName", response.data.discordUserName);
        if (callback) {
          callback(response.data);
        }
      }
    })
    .catch((error) => {
      console.error("Failed to fetch user details:", error);
      if (callback) {
        callback(null, error);
      }
    });
};

export default getUserDetails;