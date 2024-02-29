const axios = require("axios");
const { Client, GatewayIntentBits, Intents } = require("discord.js");
const User = require("../../models/User/userModal");

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
  const { targetGuildName, targetChannelName } = req.query;
  console.log("From controller",targetGuildName, targetChannelName);
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
              (inVoiceChannel && presenceStatus === "online")
                ? "voice"
                : presenceStatus,
            name: name,
          });
        }
      }

      async function getNameFromMongoDB(username) {
        try {
          // Assume you have a MongoDB User model
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
// @route POST /discord/fetchvoicechannels
// @access Private
const fetchVoiceChannels = async (req, res) => {
  const { serverName } = req.query; // Assuming serverName is provided in the request body
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

module.exports = {
  fetchPresence,
  fetchVoiceChannels,
  fetchServerList,
};
