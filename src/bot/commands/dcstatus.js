const { MessageEmbed } = require('discord.js')
const axios = require("axios")
const { Command, CommandType } = require('gcommands');

new Command({
  name: "dcstatus",
  description: "posts funny discord status",
  type: [CommandType.SLASH],
  run: async({ reply }) => {
    var buff = (await axios({
      url: new URL("https://api.hyrousek.tk/useless/reddit?reddit=FunnyDiscordStatus").toString(),
      responseType: "json"
    })).data;

    var embed = new MessageEmbed()
      .setTitle(buff.title)
      .setURL(buff.link)
      .setColor('RANDOM')
      .setImage(buff.url)
      .setFooter({ text: `Upvotes: ${buff.upvotes} | Downvotes: ${buff.downvotes}` })
      
    reply({
      embeds: [embed]
    })
  }
})