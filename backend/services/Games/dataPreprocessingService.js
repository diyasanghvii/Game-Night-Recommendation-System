async function preprocessGameData(selectedUsers) {
  //   const userGames = await fetchUserGames(selectedUsers);
  //   const userRatings = await fetchUserRatings(selectedUsers);
  //   const userGenres = await fetchUserGenres(selectedUsers);
  //   const rawgGames = await fetchRawgGames(/* ... */);
  //   // ... (Process the data to match input format for 'recommendGames')
  const gameData = [
    {
      game: 1,
      ownership: [1, 0, 1],
      matchedgenres: [3, 4, 0],
      ratings: [3, 5, null],
    },
    {
      game: 2,
      ownership: [1, 0, 0],
      matchedgenres: [3, 4, 0],
      ratings: [3, 5, null],
    },
    {
      game: 3,
      ownership: [1, 1, 1],
      matchedgenres: [3, 4, 0],
      ratings: [3, 5, null],
    },
    {
      game: 4,
      ownership: [0, 0, 1],
      matchedgenres: [3, 4, 0],
      ratings: [3, 5, null],
    },
    {
      game: 5,
      ownership: [1, 1, 1],
      matchedgenres: [3, 4, 0],
      ratings: [3, 5, null],
    },
    {
      game: 6,
      ownership: [1, 1, 1],
      matchedgenres: [3, 4, 0],
      ratings: [3, 5, null],
    },
    {
      game: 7,
      ownership: [1, 0, 0],
      matchedgenres: [3, 4, 0],
      ratings: [3, 5, null],
    },

    {
      game: 8,
      ownership: [0, 0, 1],
      matchedgenres: [3, 4, 0],
      ratings: [3, 5, null],
    },
  ];
  return gameData;
}

export default { preprocessGameData };
