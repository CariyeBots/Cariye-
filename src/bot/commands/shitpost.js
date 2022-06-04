const { Command, CommandType } = require("gcommands")
const { MessageEmbed } = require('discord.js')
const fetch = require("node-fetch");

new Command({
  name: "shitpost",
  description: "sends a shitpost",
  type: [CommandType.SLASH],
  run: async({ reply }) => {
    let json = await fetch("https://badboy.is-a.dev/api/json/shitpost").then((res) => res.json());
    let embed = new MessageEmbed()
      .setTitle(json.title)
			.setURL(json.subreddit)
      .setImage(json.image)
      .setColor("RANDOM");

    reply({
      embeds: [embed]
    })
  }
})