const axios = require("axios");
const { Client, GatewayIntentBits } = require("discord.js");

// @desc Fetch user presence from discord server
// @route GET /discord/fetchpresence
// @access Private
const fetchPresence = async (req, res) => {
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
      const targetGuildName = "diya_san's test server";
      const targetChannelName = "Lobby";
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
      const membersPresence = guild.members.cache.map((member) => {
        const presenceStatus = member.presence
          ? member.presence.status
          : "Offline";
        return {
          username: member.user.username,
          id: member.user.id,
          presence: presenceStatus,
        };
      });

      // Fetch members in the voice channel
      const membersInVoiceChannel = channel
        ? channel.members.map((member) => ({
            username: member.user.username,
            id: member.user.id,
            presence: "Online and listening to Voice Channel",
          }))
        : [];

      // Exclude members in the voice channel from the presence list
      const membersInGuild = membersPresence.filter(
        (member) =>
          !membersInVoiceChannel.some((vcMember) => vcMember.id === member.id)
      );

      res.status(200).json({
        message: "Successfully fetched discord presence!",
        memberStatus: membersInGuild,
        voiceMembers: membersInVoiceChannel,
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

      const voiceChannels = channels.filter(
        (channel) => channel.type === 2
      );
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
};
