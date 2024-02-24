const axios = require("axios");
const { Client, GatewayIntentBits } = require("discord.js");

// @desc Fetch user presence from discord server
// @route POST /discord/fetchpresence
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
    client.login(
      "MTIwMTMxNjk0Mjk1OTYxMTk2NA.GkrAg1.TTF_ERBeaMGYREH0F4pz-m2ads27ijjGUQ3puc"
    );
    client.once("ready", async () => {
      console.log("Bot is ready!");
      const targetGuildName = "diya_san's test server";
      const targetChannelName = "Lobby";
      const guild = client.guilds.cache.find(
        (guild) => guild.name === targetGuildName
      );
      const channel = guild.channels.cache.find(
        (channel) => channel.name === targetChannelName
      );

      if (channel) {
        channel.send("Hi! I am now connected and ready to fetch presences.");
      } else {
        console.error(
          "Channel not found. Make sure the provided channel ID is correct."
        );
      }

      
    });
    res.status(200).json({message: "Successful"})
  } catch (e) {}
};

module.exports = {
  fetchPresence,
};
