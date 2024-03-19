const axios = require("axios");

const BASE_URL = "https://steam-api-dot-cs-platform-306304.et.r.appspot.com";

async function fetchAllGenres() {
  const allGenres = [];
  let currentPage = 1;
  let totalPages = 4;
  const sensitiveTags = process.env.AGE_SENSITIVE_TAGS.split(",");

  while (currentPage <= totalPages) {
    try {
      const response = await axios.get(
        `${BASE_URL}/genres?page=${currentPage}`
      );
      const data = response.data;

      //totalPages = data.total;
      allGenres.push(
        ...data.data
          .filter((genre) => !sensitiveTags.includes(genre.name.toLowerCase()))
          .map((genre) => genre.name)
      );

      currentPage++;
    } catch (error) {
      console.error("Error fetching genres:", error);
      throw error;
    }
  }

  return allGenres;
}

module.exports = { fetchAllGenres };
