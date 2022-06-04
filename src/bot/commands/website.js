const Discord = require('discord.js');
const { Command, CommandType, Argument, ArgumentType } = require('gcommands');
const axios = require("axios");

new Command({
  name: "website",
  description: "takes a website screenshot",
  type: [ CommandType.SLASH ],
  arguments: [
    new Argument({
      name: "url",
      description: "write any website url",
      type: ArgumentType.STRING,
      required: true
    })
  ],
  async run({ reply, arguments }) {
    var string = arguments.getString('url')

    try {
      var buff = (await axios({
        url: `https://shot.screenshotapi.net/screenshot?&url=${string}&full_page=true&output=image&file_type=png&block_ads=true&dark_mode=true`,
        responseType: "arraybuffer"
      })).data

      const e = new Discord.MessageEmbed()
        .setImage(buff.toBuffer())
        .setColor("RANDOM")

      return reply({
        embeds: [e]
      })
    } catch(e) {
      return reply({
        content: "Website not working :(",
        ephemeral: true
      })
    }
  }
})