const axios = require("axios");
const { fetchAllGenres } = require("../../services/gameService");

// @desc Genre API
// @route POST /game/getgenre
// @access Private
const getGenre = async (req, res) => {
  try {
    const response = await axios.get(
      `https://api.rawg.io/api/genres?key=${process.env.RAWG_API_KEY}`
    );
    const data = response.data;
    let genreNames;
    if (data && data.results) {
      genreNames = data.results.map((genre) => genre.name);
      res
        .status(200)
        .send({ message: "Fetched genre list!", genreList: genreNames });
    } else {
      res.status(404).send({ message: "No data found!" });
    }
  } catch (e) {
    res.status(500).send("Error Occurred, Try again!");
  }
};

// @desc get STEAM Genre API
// @route POST /game/getsteamgenre
// @access Private
const getSteamGenres = async (req, res) => {
  try {
    const genreNames = await fetchAllGenres();
    if (genreNames.length === 0) {
      return res.status(404).send({ message: "No genres found!" });
    }
    res
      .status(200)
      .send({ message: "Fetched genre list!", genreList: genreNames });
  } catch (e) {
    res.status(500).send("Error Occurred, Try again!");
  }
};

module.exports = {
  getGenre,
  getSteamGenres,
};
