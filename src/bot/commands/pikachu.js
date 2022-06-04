const { Command, CommandType } = require("gcommands")
const { MessageEmbed } = require("discord.js")
const axios = require("axios")

new Command({
  name: "pikachu",
  description: "pikachuuuuuuuuuu",
  type: [CommandType.SLASH],
  run: async({ reply }) => {
    const buff = await axios.get("https://some-random-api.ml/img/pikachu")
    const embed = new MessageEmbed()
      .setTitle("Pi-ka-chuuuuuuuu")
      .setColor("RANDOM")
      .setImage(`${buff.data.link}`)

    reply({
      embeds: [embed]
    })
  }
})