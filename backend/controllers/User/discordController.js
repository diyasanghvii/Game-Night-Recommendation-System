const axios = require("axios");
const User = require("../../models/User/userModal");
const { Client, GatewayIntentBits, Intents } = require("discord.js");
const { EmbedBuilder } = require("discord.js");

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
  const gameList = req.body.recommendations;
  if (!channelName) {
    return res.status(400).json({ message: "Channel not found." });
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
      const channel = guild.channels.cache.find(
        (channel) => channel.name === channelName
      );
      if (channel) {
        let memberlist = "";
        let count = 1;
        let gamelist = "";
        for (const key in members) {
          if (members.hasOwnProperty(key)) {
            const element = members[key];
            memberlist += `\n${count}. ${element.name}`;
            count++;
          }
        }
        const border = new EmbedBuilder().setAuthor({
          name: "•───────────────⋅☾ ☽⋅───────────────•"
        });
        const border1 = new EmbedBuilder().setAuthor({
          name: "•───────────────⋅☾ ☽⋅───────────────•"
        });
        const embed = new EmbedBuilder().setAuthor({
          name: "Game Night Recommender",
          iconURL: "https://i.postimg.cc/cL5C4Kcw/game.png",
        });

        const embed1 = new EmbedBuilder()
          .setAuthor({
            name: `Memberlist :`,
            iconURL:
              "https://i.postimg.cc/7699w4JW/output-onlinepngtools-2.png",
          })
          .addFields({
            name: ` ${memberlist}`,
            value: " ",
          });
        const embed2 = new EmbedBuilder()
          .setAuthor({
            name: ` Recommended Games :`,
            iconURL:
              "https://i.postimg.cc/y6JKLWmr/output-onlinepngtools-1.png",
          })
          .setTimestamp();
        let gamecount = 1;
        const gameEmbedList = [];
        channel.send({ embeds: [border,embed,embed1,embed2] });
        for (const key in gameList) {
          if (gameList.hasOwnProperty(key)) {
            const element = gameList[key];
            const embed = new EmbedBuilder()
              .setThumbnail(
                `https://steamcdn-a.akamaihd.net/steam/apps/${element.gameSteamId}/header.jpg`
              )
              .addFields({
                name: `\n${gamecount}. ${element.gameName}`,
                value: `\nReason for recommendation: ${element.reason}\n`,
              });
            gamelist += `\n${gamecount}. ${element.gameName}`;
            gamelist += `\nReason for recommendation: ${element.reason}\n`;
            gamecount++;
            gameEmbedList.push(embed);
          }
        }
        gameEmbedList.push(border1);
        channel.send({ embeds: gameEmbedList });
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
