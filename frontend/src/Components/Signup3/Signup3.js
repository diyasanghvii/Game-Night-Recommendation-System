import React, { useState } from "react";
import { Container, Select, MenuItem, Box, Rating } from "@mui/material";
import Btn from "../Button/Btn";
import Text from "../Typography/Text";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import { SignUpThree } from "../../Services";

const Signup3 = ({ email, stepThreeDone }) => {
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [error, setError] = useState("");
  const [games, setGames] = useState([
    { gameName: "Pubg", ratings: null },
    { gameName: "The Forest", ratings: null },
    { gameName: "Apex Legends", ratings: null },
    { gameName: "Halo Infinite", ratings: null },
    { gameName: "Counter Strike 2", ratings: null },
    { gameName: "Warframe", ratings: null },
  ]);

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

    const data = {
      email: email,
      preferredGenres: selectedGenres,
      preferences: games,
    };

    console.log("");

    SignUpThree(data)
      .then((response) => {
        if (response && response.data) {
          stepThreeDone();
        }
      })
      .catch((error) => {
        alert(error?.response?.data?.message);
      });
  };

  return (
    <Container maxWidth="sm">
      <Text variant="h4" gutterBottom={true} label={"Signup"} />

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
          <MenuItem value="action">Action</MenuItem>
          <MenuItem value="adventure">Adventure</MenuItem>
          <MenuItem value="comedy">Comedy</MenuItem>
          <MenuItem value="drama">Drama</MenuItem>
          <MenuItem value="fantasy">Fantasy</MenuItem>
          <MenuItem value="horror">Horror</MenuItem>
          <MenuItem value="mystery">Mystery</MenuItem>
          <MenuItem value="romance">Romance</MenuItem>
          <MenuItem value="science_fiction">Science Fiction</MenuItem>
          <MenuItem value="thriller">Thriller</MenuItem>
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
                label={game.gameName}
                style={{ marginRight: "20px" }}
              />
              <Rating
                name={`rating-${index}`}
                value={game.ratings}
                precision={0.5}
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

export default Signup3;
