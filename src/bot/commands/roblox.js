const { MessageEmbed } = require('discord.js')
const { Command, CommandType } = require("gcommands")
const axios = require("axios")

new Command({
  name: "roblox",
  description: "posts roblox meme",
  type: [CommandType.SLASH],
  run: async({ reply }) => {
    var buff = (await axios({
      url: new URL("https://api.hyrousek.tk/useless/reddit?reddit=roblox").toString(),
      responseType: "json"
      })).data;

    var embed = new MessageEmbed()
      .setImage(buff.url)
      .setColor('RANDOM')
      .setURL(buff.link)
      .setTitle(buff.title)
    reply({
      embeds: [embed]
    })
  }
})