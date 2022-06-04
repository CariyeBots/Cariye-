const { MessageEmbed } = require('discord.js')
const { Command, CommandType } = require('gcommands');
const axios = require("axios")

new Command({
  name: "fortnite",
  description: "fortinayt",
  type: [CommandType.SLASH],
  run: async({ reply }) => {
    let buff = (await axios({
      url: new URL("https://api.hyrousek.tk/useless/reddit?reddit=fortnitebr").toString(),
      responseType: "json"
      })).data;

    let embed = new MessageEmbed()
      .setImage(buff.url)
      .setColor('RANDOM')
      .setURL(buff.link)
      .setTitle(buff.title)
      .setFooter({ text: `Upvotes: ${buff.upvotes} | Downvotes: ${buff.downvotes}` })

    reply({
      embeds: [embed]
    })
  }
})