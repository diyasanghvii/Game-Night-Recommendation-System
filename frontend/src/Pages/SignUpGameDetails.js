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
          setGames(modifiedSteamGames.slice(0, 9)); // Limiting to 9 games
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
          console.log("response.data.genreList : ",response.data.genreList)
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
    const numRatedGames = games.filter((game) => game.ratings !== null).length;
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
    <Container maxWidth="sm">
      <Text variant="h4" gutterBottom={true} label={"Signup"} />
      <Stepper
        sx={{ marginTop: 5, marginBottom: 5 }}
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
          variant="body1"
          gutterBottom={true}
          label={"Select your preferred Genre:"}
        />
        <Select
          multiple
          value={selectedGenres}
          onChange={handleGenreSelection}
          fullWidth
        >
          {genreList?.map((ele) => {
            return <MenuItem value={ele}>{ele}</MenuItem>;
          })}
        </Select>
      </Box>

      <Box style={{ marginBottom: "20px" }}>
        <Text
          variant="body1"
          gutterBottom={true}
          label={"Rate your games:"}
          style={{ marginRight: "20px" }}
        />
      </Box>

      <div style={{ display: "flex", flexWrap: "wrap" }}>
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
                style={{ marginRight: "20px" }}
              />
              <Rating
                name={`rating-${index}`}
                value={game.ratings}
                onChange={(event) => handleRatingChange(event, index)}
                max={5}
              />
            </Box>
          </div>
        ))}
      </div>

      <Btn
        fullWidth={true}
        label={"Complete Registration"}
        onClick={handleSignup}
      />
    </Container>
  );
};

export default SignUpGameDetails;
