async function preprocessGameData(selectedUsers) {
  //   const userGames = await fetchUserGames(selectedUsers);
  //   const userRatings = await fetchUserRatings(selectedUsers);
  //   const userGenres = await fetchUserGenres(selectedUsers);
  //   //Process the data to match input format for 'recommendGames'
  const gameData = [
    {
      gameSteamId: 1,
      name: "Game 1",
      ownership: [0, 0, 0],
      matchedgenres: [2, 1, 0],
      ratings: [null, 5, null],
      interest: [null, 1, 0.75],
    },
    {
      gameSteamId: 2,
      name: "Game 2",
      ownership: [0, 0, 1],
      matchedgenres: [1, 0, 1],
      ratings: [4, null, null],
      interest: [null, 1, 0.75],
    },
    {
      gameSteamId: 3,
      name: "Game 3",
      ownership: [0, 1, 0],
      matchedgenres: [0, 0, 2],
      ratings: [2, 3, null],
      interest: [null, 1, 0.75],
    },
    {
      gameSteamId: 4,
      name: "Game 4",
      ownership: [0, 1, 1],
      matchedgenres: [1, 0, 0],
      ratings: [1, 3, 3],
      interest: [null, 1, 0.75],
    },
    {
      gameSteamId: 5,
      name: "Game 5",
      ownership: [1, 0, 0],
      matchedgenres: [2, 2, 1],
      ratings: [5, 5, null],
      interest: [null, 1, 0.75],
    },
    {
      gameSteamId: 6,
      name: "Game 6",
      ownership: [1, 0, 1],
      matchedgenres: [0, 1, 0],
      ratings: [3, 4, 3],
      interest: [null, 1, 0.75],
    },
    {
      gameSteamId: 7,
      name: "Game 7",
      ownership: [1, 1, 0],
      matchedgenres: [2, 0, 1],
      ratings: [3, 2, 5],
      interest: [null, 1, 0.75],
    },
    {
      gameSteamId: 8,
      name: "Game 8",
      ownership: [1, 1, 1],
      matchedgenres: [0, 2, 0],
      ratings: [1, null, 1],
      interest: [null, 1, 0.75],
    },
  ];
  return gameData;
}

module.exports = { preprocessGameData };
