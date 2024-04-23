import axios from "axios";

const unAuthRequest = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
});

export const authRequest = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const authLocalStorageRequest = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

authLocalStorageRequest.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("signUpToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

authRequest.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem("authToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

authRequest.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      sessionStorage.removeItem("authToken");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

// Profile API to check if user is authorised
export const profileCheck = (token) => {
  return new Promise((resolve, reject) => {
    authRequest
      .get("/auth/profile")
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

// Login API
export const Login = (data) => {
  return new Promise((resolve, reject) => {
    unAuthRequest
      .post("/user/login", {
        email: data.email,
        password: data.password,
      })
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

// Signup One API
export const SignUpOne = (data) => {
  return new Promise((resolve, reject) => {
    unAuthRequest
      .post("/user/signupone", {
        name: data.name,
        email: data.email,
        password: data.password,
      })
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

// Signup Two API
export const SignUpTwo = (data) => {
  return new Promise((resolve, reject) => {
    authLocalStorageRequest
      .post("/user/signuptwo", data)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

// Signup Three API
export const SignUpThree = (data) => {
  return new Promise((resolve, reject) => {
    authLocalStorageRequest
      .post("/user/signupthree", data)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

// Get user's details API
export const GetUserDetails = () => {
  return new Promise((resolve, reject) => {
    authRequest
      .get("/user/getuserdetails")
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const SaveUserDetails = (data) => {
  return new Promise((resolve, reject) => {
    authRequest
      .post("/user/saveuserdetails", data)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const DeleteUserDetails = (data) => {
  return new Promise((resolve, reject) => {
    authRequest.delete('/user/deleteuserdetails', { data })
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
};


// Update user Genre
export const UpdateUserGenre = (data) => {
  return new Promise((resolve, reject) => {
    authRequest
      .post("/user/updategenre", data)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const GetGenreListSignUP = () => {
  return new Promise((resolve, reject) => {
    authLocalStorageRequest
      .get("/game/getsteamgenre")
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

// Get Genre List
export const GetGenreList = () => {
  return new Promise((resolve, reject) => {
    authRequest
      .get("/game/getsteamgenre")
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const getOwnedGamesSignUp = () => {
  return new Promise((resolve, reject) => {
    authLocalStorageRequest
      .get("/steam/getusersteamgamelist")
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

// Get Server List
export const GetServerList = (data) => {
  return new Promise((resolve, reject) => {
    authRequest
      .get(`/discord/fetchserverlist?discordUserName=${data}`)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

// Get Server List Sign Up
export const GetServerListSignUp = (data) => {
  return new Promise((resolve, reject) => {
    authLocalStorageRequest
      .get(`/discord/fetchserverlist?discordUserName=${data}&${Date.now()}`)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

// Get Server List Edit Profile
export const GetServerListEditProfile = (data) => {
  return new Promise((resolve, reject) => {
    authRequest
      .get(`/discord/fetchserverlist?discordUserName=${data}&${Date.now()}`)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

// Get user ratings
export const GetUserRatings = (data) => {
  return new Promise((resolve, reject) => {
    authRequest
      .get("/user/getpreferences", data)

      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

// Get Channel List
export const GetChannelList = (data) => {
  return new Promise((resolve, reject) => {
    authRequest
      .get(`/discord/fetchvoicechannels?serverName=${data}`)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

// Get Presence of Members
export const GetPresence = (data) => {
  return new Promise((resolve, reject) => {
    authRequest
      .get(
        `/discord/fetchpresence?targetGuildName=${data.selectedServer}&targetChannelName=${data.selectedChannel}&discordUN=${data.discordUserName}`
      )
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

// Update user rating
export const UpdateUserRating = (data) => {
  return new Promise((resolve, reject) => {
    authRequest
      .post("/user/updaterating", data)

      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

// Send Recommendation List to discord channel
export const SendList = (data) => {
  return new Promise((resolve, reject) => {
    authRequest
      .post("/discord/sendlist", data)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

// Save user rating of unowned games
export const UpdateUnownedUserGameRating = (data) => {
  return new Promise((resolve, reject) => {
    authRequest
      .post("/user/updateunownedgamerating", data)

      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

// Verify User Steam ID
export const VerifyUserSteamId = (data) => {
  return new Promise((resolve, reject) => {
    authLocalStorageRequest
      .post("/user/verifyusersteamid", data)

      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
};



export const VerifyUserSteamIdInEditProfile = (data) => {
  return new Promise((resolve, reject) => {
    authRequest
      .post("/user/verifyusersteamid", data)

      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
// Add CheckUniqueSteamId function for edit profile
export const CheckUniqueSteamIdAuthReq = (data) => {
  return new Promise((resolve, reject) => {
    authRequest
      .post("/user/checkuniquesteamid", data)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

// Add CheckUniqueSteamId function
export const CheckUniqueSteamId = (data) => {
  return new Promise((resolve, reject) => {
    authLocalStorageRequest
      .post("/user/checkuniquesteamid", data)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

// Add CheckUniqueDiscordUserName function
export const CheckUniqueDiscordUserName = (data) => {
  return new Promise((resolve, reject) => {
    authLocalStorageRequest
      .post("/user/checkuniquediscordusername", data)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

// Add CheckUniqueDiscordUserName function for edit profile
export const CheckUniqueDiscordUserNameAuthReq = (data) => {
  return new Promise((resolve, reject) => {
    authRequest
      .post("/user/checkuniquediscordusername", data)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
};


// Generate and Fetch recommendations
export const GenerateRecommendations = (data) => {
  return new Promise((resolve, reject) => {
    authRequest
      .post("/recommend/getRecommendations", data)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

// Cache User Games
export const CacheUserSteamGames = () => {
  return new Promise((resolve, reject) => {
    authRequest
      .post("/steam/backupusersteamdata")
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

// ALl Games API
export const FetchAllGames = ({ url }) => {
  const apiUrl = url;
  return new Promise((resolve, reject) => {
    axios
      .get(apiUrl)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

// Free Cross-platform Multiplayer Games API
export const FetchFreeGames = ({ url, searchString }) => {
  const apiUrl = url
    ? url
    : `https://api.gamalytic.com/steam-games/list?fields=name,steamId&title=${searchString}&limit=40&genres=Free%20to%20Play&features=Cross-Platform%20Multiplayer`;
  return new Promise((resolve, reject) => {
    axios
      .get(apiUrl)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

// Clear User ratings
export const ClearRatings = (data) => {
  return new Promise((resolve, reject) => {
    authRequest
      .post("/user/clearrating", data)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
