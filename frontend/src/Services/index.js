import axios from "axios";

const axiosSetting = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
});

// Example to Make a GET request, add functions and add the requires URL and headers
export const getTestData = (data) => {
  return new Promise((resolve, reject) => {
    axiosSetting
      .get("/testApi")
      .then((response) => {
        if (response && response.status === 200) {
          resolve(response);
        }
      })
      .catch((error) => {
        reject(error);
      });
  });
};

// Example with headers to send auth tokens and other data
export const example = (data) => {
  return new Promise((resolve, reject) => {
    axios
      .get("https://example.com/api/data", {
        headers: {
          Authorization: "Bearer your_access_token", // change to any token for steam apis
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
