import React, { useState } from "react";
import { Container, Select, MenuItem, Box, Rating, Grid } from "@mui/material";
import Btn from "../Button/Btn";
import Text from "../Typography/Text";
import ErrorMessage from "../ErrorMessage/ErrorMessage";

const Signup3 = () => {
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [error, setError] = useState("");
  const [games, setGames] = useState([
    { name: "Pubg", rating: null },
    { name: "The Forest", rating: null },
    { name: "Apex Legends", rating: null },
    { name: "Halo Infinite", rating: null },
    { name: "Counter Strike 2", rating: null },
    { name: "Warframe", rating: null }
  ]);

  const handleGenreSelection = (event) => {
    setSelectedGenres(event.target.value);
  };

  const handleRatingChange = (event, index) => {
    const updatedGames = [...games];
    updatedGames[index].rating = event.target.value;
    setGames(updatedGames);
  };

  const handleSignup = () => {
    const numSelectedGenres = selectedGenres.length;
    const numRatedGames = games.filter(game => game.rating !== null).length;
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
    console.log("Selected Genres:", selectedGenres);
    console.log("Game Ratings:", games);
  };
  return (
    <Container maxWidth="sm">
      <Text variant="h4" gutterBottom={true} label={"Signup"} />
      
      {error && <ErrorMessage message={error} />}
      
      <Box style={{ maxWidth: "700px", margin: "auto", marginTop: "20px", marginBottom: "20px" }}>
        <Text variant="body1" gutterBottom={true} label={"Select your preferred Genre:"} />
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

      <Grid container spacing={2}>
        {games.map((game, index) => (
          <Grid item xs={4} key={index}>
            <Box>
              <Text variant="body1" gutterBottom={true} label={game.name} style={{ marginRight: "20px" }} />
              <Rating
                name={`rating-${index}`}
                value={game.rating}
                precision={0.5}
                onChange={(event) => handleRatingChange(event, index)}
                max={5}
              />
            </Box>
          </Grid>
        ))}
      </Grid>

      <Btn fullWidth={true} label={"Complete Registration"} onClick={handleSignup} />
    </Container>
  );
};

export default Signup3;
