const axios = require("axios")
const { MessageEmbed } = require("discord.js")
const { Command, CommandType } = require("gcommands")

new Command({
  name: "advice",
  description: "gives u an advice",
	nameLocalizations: {
    "tr": "tavsiye"
  },
  descriptionLocalizations: {
    "tr": "tavsiye ister misin"
  },
  type: [ CommandType.SLASH ],
  async run({ reply }) {
    let buff = await axios.get("https://api.adviceslip.com/advice")
    let embed = new MessageEmbed()
      .setDescription(`${buff.data.slip.advice}`)
      .setColor("RANDOM")
    reply({ embeds: [embed] })
  }
})