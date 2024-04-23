import React, { useEffect, useState } from "react";
import { Container, Select, MenuItem, Box, Rating } from "@mui/material";
import Btn from "../Components/Button/Btn";
import Text from "../Components/Typography/Text";
import ErrorMessage from "../Components/ErrorMessage/ErrorMessage";
import {
  GetGenreListSignUP,
  SignUpThree,
  getOwnedGamesSignUp,
} from "../Services";
import { useNavigate, useLocation } from "react-router-dom";
import { Stepper, Step, StepLabel } from "@mui/material";

const SignUpGameDetails = () => {
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [error, setError] = useState("");
  const [games, setGames] = useState([]);
  const [genreList, setGenreList] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = location;

  useEffect(() => {
    getGenre();
    fetchSteamData();
  }, []);

  const fetchSteamData = () => {
    getOwnedGamesSignUp()
      .then((response) => {
        if (response && response.data && response.data.steamGames) {
          const modifiedSteamGames = response.data.steamGames.map((ele) => ({
            ...ele,
            gameSteamId: ele.appid,
          }));
          setGames(modifiedSteamGames.slice(0, 8)); // Limiting to 8 games
        }
      })
      .catch((error) => {
        setGames([]);
      });
  };

  const getGenre = () => {
    GetGenreListSignUP()
      .then((response) => {
        if (response && response.data && response.data.genreList) {
          setGenreList(response.data.genreList);
        }
      })
      .catch((error) => {
        setGenreList([]);
      });
  };

  const handleGenreSelection = (event) => {
    setSelectedGenres(event.target.value);
  };

  const handleRatingChange = (event, index) => {
    const updatedGames = [...games];
    updatedGames[index].ratings = event.target.value;
    setGames(updatedGames);
  };

  const handleSignup = () => {
    const numSelectedGenres = selectedGenres.length;
    const numRatedGames = games.filter((game) =>
      game.ratings ? game.ratings : null !== null
    ).length;
    if (numSelectedGenres < 5 && numRatedGames < 5) {
      setError("Please select at least 5 genres and rate at least 5 games.");
      return;
    }
    if (numSelectedGenres < 5) {
      setError("Please select at least 5 genres.");
      return;
    }
    if (numRatedGames < 5) {
      setError("Please rate at least 5 games.");
      return;
    }

    const filterObjectsWithRatings = games.filter((obj) =>
      obj.hasOwnProperty("ratings")
    );

    const updatedData = filterObjectsWithRatings.map((game) => ({
      ...game,
      gameName: game.name,
    }));
    const email = localStorage.getItem("email");
    const data = {
      email: email,
      preferredGenres: selectedGenres,
      preferences: updatedData,
    };

    SignUpThree(data)
      .then((response) => {
        if (response && response.data) {
          localStorage.clear();
          sessionStorage.setItem("authToken", response.data.token);
          navigate("/dashboard");
        }
      })
      .catch((error) => {
        alert(error?.response?.data?.message);
      });
  };
  return (
    <div
      className="all-root"
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.4)",
      }}
    >
      <Container
        maxWidth="sm"
        sx={{ background: "rgba(0, 0, 0, 0.7)", padding: 4, borderRadius: 8 }}
      >
        <Text
          variant="h4"
          gutterBottom={true}
          label={"Sign Up"}
          customStyle={{ fontSize: "30px", marginBottom: "25px" }}
        />
        <Stepper
          sx={{
            marginTop: 0,
            marginBottom: 5,
            "& .MuiStepLabel-root .Mui-completed": {
              color: "green", // Completed steps text color
            },
            "& .MuiStepLabel-label.Mui-completed.MuiStepLabel-alternativeLabel":
              {
                color: "green", // Completed alternative steps text color
              },
            "& .MuiStepLabel-root .Mui-active": {
              color: "white", // Active step text color
            },
            "& .MuiStepLabel-label.Mui-active.MuiStepLabel-alternativeLabel": {
              color: "#ADD8E6", // Active alternative step text color (light blue)
            },
            "& .MuiStepLabel-root .Mui-active .MuiStepIcon-text": {
              fill: "#0e64ab", // Active step icon color
            },
            "& .MuiStepLabel-root .Mui-disabled": {
              color: "grey", // Incomplete steps text color
            },
          }}
          activeStep={2}
          alternativeLabel
        >
          <Step key={0}>
            <StepLabel>Step 1</StepLabel>
          </Step>
          <Step key={1}>
            <StepLabel>Step 2</StepLabel>
          </Step>
          <Step key={2}>
            <StepLabel>Step 3</StepLabel>
          </Step>
        </Stepper>

        {error && <ErrorMessage message={error} />}

        <Box
          style={{
            maxWidth: "700px",
            margin: "auto",
            marginTop: "20px",
            marginBottom: "20px",
          }}
        >
          <Text
            variant="header5"
            gutterBottom={true}
            label={"Select your preferred Genre:"}
            customStyle={{ fontSize: "20px" }}
          />
          <Select
            multiple
            value={selectedGenres}
            onChange={handleGenreSelection}
            fullWidth
            style={{
              backgroundColor: "rgba(255,255,255, 0.2)",
              color: "white",
              marginTop: "15px",
            }}
            MenuProps={{
              PaperProps: {
                style: {
                  backgroundColor: "rgb(78, 63, 105)",
                  color: "white",
                  border: "4px solid #424042",
                },
              },
            }}
          >
            {genreList?.map((ele) => {
              return (
                <MenuItem
                  key={ele}
                  value={ele}
                  sx={{
                    color: "white",
                    "&.Mui-selected": {
                      backgroundColor: "#868387",
                    },
                    "&.Mui-selected:hover": {
                      backgroundColor: "#868387",
                    },
                    "&:hover": {
                      backgroundColor: "rgba(134, 131, 135, 0.4)",
                    },
                    borderBottom: "1px solid rgba(134, 131, 135, 0.4)",
                  }}
                >
                  {ele}
                </MenuItem>
              );
            })}
          </Select>
        </Box>

        <Box style={{ marginBottom: "20px" }}>
          <Text
            variant="header4"
            gutterBottom={true}
            label={"Rate your games:"}
            style={{ marginRight: "20px" }}
            customStyle={{ fontSize: "20px" }}
          />
        </Box>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "flex-start",
          }}
        >
          {games.map((game, index) => (
            <div
              key={index}
              style={{ marginRight: "20px", marginBottom: "20px" }}
            >
              <Box>
                <Text
                  variant="body1"
                  gutterBottom={true}
                  label={game.name}
                  customStyle={{
                    marginRight: "20px",
                    minWidth: "200px",
                  }}
                />
                <Rating
                  name={`rating-${index}`}
                  value={game.ratings}
                  onChange={(event) => handleRatingChange(event, index)}
                  max={5}
                  sx={{
                    "& .MuiRating-iconFilled": {
                      color: "#FFD700", // Filled star color
                      fontSize: "1.5rem !important",
                    },
                    "& .MuiRating-iconEmpty": {
                      color: "#ccc", // Empty star color
                      fontSize: "1.5rem !important",
                    },
                  }}
                />
              </Box>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 20 }}>
          <Btn
            fullWidth={true}
            label={"Complete Registration"}
            onClick={handleSignup}
          />
        </div>
      </Container>
    </div>
  );
};

export default SignUpGameDetails;
