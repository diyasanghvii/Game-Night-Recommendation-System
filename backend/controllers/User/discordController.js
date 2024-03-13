const axios = require("axios");
const { Client, GatewayIntentBits, Intents } = require("discord.js");
const User = require("../../models/User/userModal");

const BASE_URL = "http://api.steampowered.com";

// @desc Fetch server list where user is a member
// @route GET /discord/fetchserverlist
// @access Private
const fetchServerList = async (req, res) => {
  const { discordUserName } = req.query;
  const client = new Client({
    intents: [
      GatewayIntentBits.Guilds,
      GatewayIntentBits.GuildMessages,
      GatewayIntentBits.MessageContent,
      GatewayIntentBits.GuildMembers,
      GatewayIntentBits.GuildPresences,
    ],
  });

  try {
    client.login(process.env.BOT_TOKEN);
    client.once("ready", async () => {
      const guilds = client.guilds.cache;
      const memberGuilds = [];

      for (const guild of guilds.values()) {
        await guild.members.fetch();
        const member = guild.members.cache.find(
          (member) => member.user.username === discordUserName
        );
        if (member) {
          memberGuilds.push(guild.name);
        }
      }

      res.status(200).json({
        message: "Successfully fetched server list!",
        serverList: memberGuilds,
      });
    });
  } catch (e) {
    res.send(500).json({ message: "Error occured, try again." });
  }
};

// @desc Fetch user presence from discord server
// @route GET /discord/fetchpresence
// @access Private
const fetchPresence = async (req, res) => {
  const { targetGuildName, targetChannelName, discordUN } = req.query;
  const client = new Client({
    intents: [
      GatewayIntentBits.Guilds,
      GatewayIntentBits.GuildMessages,
      GatewayIntentBits.MessageContent,
      GatewayIntentBits.GuildMembers,
      GatewayIntentBits.GuildPresences,
    ],
  });
  try {
    client.login(process.env.BOT_TOKEN);
    client.once("ready", async () => {
      const guild = client.guilds.cache.find(
        (guild) => guild.name === targetGuildName
      );
      const channel = guild.channels.cache.find(
        (channel) => channel.name === targetChannelName
      );

      if (!channel) {
        res.send(400).json({ message: "Channel not found." });
      }

      await guild.members.fetch();
      const membersPresence = [];
      for (const member of guild.members.cache.values()) {
        const presenceStatus = member.presence
          ? member.presence.status
          : "offline";
        const inVoiceChannel = channel && channel.members.has(member.id);
        const name = await getNameFromMongoDB(member.user.username);
        if (name) {
          // Only add user if name is found in MongoDB
          membersPresence.push({
            username: member.user.username,
            id: member.user.id,
            presence:
              inVoiceChannel && presenceStatus === "online"
                ? "voice"
                : presenceStatus,
            name: name,
          });
        }
      }

      const indexToRemove = membersPresence.findIndex(
        (member) => member.username === discordUN
      );

      // Remove the item from the array if found
      if (indexToRemove !== -1) {
        membersPresence.splice(indexToRemove, 1);
      }

      async function getNameFromMongoDB(username) {
        try {
          const user = await User.findOne({ discordUserName: username });
          return user ? user.name : "";
        } catch (error) {
          console.error("Error fetching name from MongoDB:", error);
          return "";
        }
      }

      res.status(200).json({
        message: "Successfully fetched discord presence!",
        memberStatus: membersPresence,
      });
    });
  } catch (e) {
    res.send(500).json({ message: "Error occured, try again." });
  }
};

// @desc Fetch voice channel names from a Discord server
// @route GET /discord/fetchvoicechannels
// @access Private
const fetchVoiceChannels = async (req, res) => {
  const { serverName } = req.query;
  if (!serverName) {
    return res.status(400).json({ message: "Server name is required." });
  }

  const client = new Client({
    intents: [
      GatewayIntentBits.Guilds,
      GatewayIntentBits.GuildMessages,
      GatewayIntentBits.MessageContent,
      GatewayIntentBits.GuildMembers,
      GatewayIntentBits.GuildPresences,
    ],
  });

  try {
    client.login(process.env.BOT_TOKEN);

    client.once("ready", async () => {
      const guild = client.guilds.cache.find(
        (guild) => guild.name === serverName
      );

      if (!guild) {
        return res.status(404).json({ message: "Server not found." });
      }

      let channels = await guild.channels.fetch();

      const voiceChannels = channels.filter((channel) => channel.type === 2);
      const voiceChannelNames = voiceChannels.map((channel) => channel.name);

      res.status(200).json({
        message: "Successfully fetched voice channels!",
        voiceChannels: voiceChannelNames,
      });
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Error occurred, try again." });
  }
};

// @desc Send recommendation list on click of a button.
// @route POST /discord/sendlist
// @access Private
const sendList = async (req, res) => {
  const channelName = req.body.selectedChannel;
  const serverName = req.body.selectedServer;
  const members = req.body.selectedMembers;
  const gamePool = [];
  if (!channelName) {
    return res.status(400).json({ message: "Channel not found." });
  }

  for (const key in members) {
    if (members.hasOwnProperty(key)) {
      const element = members[key];
      let data = await User.findOne({
        discordUserName: element.username,
      }).exec();
      //console.log(data);
      element.steamID = data.steamId;
      element.preferredGenres = data.preferredGenres;
      element.preferences = data.preferences;
      //console.log(JSON.stringify(element));
      const url = `${BASE_URL}/IPlayerService/GetOwnedGames/v0001/?key=${process.env.STEAM_API_KEY}&steamid=${data.steamId}&format=json&include_appinfo=True&include_played_free_games=True`;
      const response = await axios.get(url);
      const ownedGames = response.data.response.games;
      element.ownedgames = ownedGames ? ownedGames : [];
      //for (const game of element.ownedgames.concat(element.preferences)) {
      for (const game of element.preferences) {
        const existingGame = gamePool.find(
          (item) => item.appid === game.gameSteamId
        );
        //console.log(game.gameSteamId);
        if (!existingGame && game.gameSteamId != undefined) {
          //console.log(game.gameSteamId);
          const genreUrl = `http://store.steampowered.com/api/appdetails/?filters=genres,categories&appids=${game.gameSteamId}`;
          const genreResponse = await axios.get(genreUrl);
          //console.log(genreResponse, undefined, 5);
          const genresRes = genreResponse.data[`${game.gameSteamId}`].data.genres;
          const genresList = [];
          genresRes.forEach(element => {
            genresList.push(element.description);
          });
          //console.log("Genre data response: ",genresList);
          const categoriesRes =
            genreResponse.data[`${game.gameSteamId}`].data.categories;
          const categoriesList = [];
          categoriesRes.forEach(element => {
            categoriesList.push(element.description);
          });
          //console.log("Category data response: ",categoriesList);
          gamePool.push({
            appid: game.gameSteamId,
            name: game.gameName,
            genres: genresList,
            categories: categoriesList,
          });
        }
      }
      //console.log(JSON.stringify(element, undefined, 5));
    }
  }
  console.log(JSON.stringify(gamePool, undefined, 5));
  console.log(gamePool.length);
  const client = new Client({
    intents: [
      GatewayIntentBits.Guilds,
      GatewayIntentBits.GuildMessages,
      GatewayIntentBits.MessageContent,
      GatewayIntentBits.GuildMembers,
      GatewayIntentBits.GuildPresences,
    ],
  });

  try {
    client.login(process.env.BOT_TOKEN);
    client.once("ready", async () => {
      const guild = client.guilds.cache.find(
        (guild) => guild.name === serverName
      );
      const channel = guild.channels.cache.find(
        (channel) => channel.name === channelName
      );
      if (channel) {
        let memberlist = "";
        let count = 1;
        for (const key in members) {
          if (members.hasOwnProperty(key)) {
            const element = members[key];
            memberlist += `\n${count}. ${element.name}`;
            count++;
          }
        }
        channel.send(
          `This message would display the recommendation list :) having Memberlist: ${memberlist}`
        );
      }

      res.status(200).json({
        message: "Successfully sent recommendations.",
      });
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Error occurred, try again." });
  }
};

module.exports = {
  fetchPresence,
  fetchVoiceChannels,
  fetchServerList,
  sendList,
};
