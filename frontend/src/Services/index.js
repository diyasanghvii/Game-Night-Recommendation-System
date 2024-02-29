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
    authRequest
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
    authRequest
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

// Get Genre List
export const GetGenreList = () => {
  return new Promise((resolve, reject) => {
    authRequest
      .get("/game/getgenre")
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
