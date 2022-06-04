const { MessageEmbed } = require("discord.js")
const { Command, CommandType, Argument, ArgumentType } = require("gcommands")

new Command({
  name: "catsay",
  description: "Cat say thing of your choice",
  type: [ CommandType.SLASH ],
  arguments: [
    new Argument({
      name: "text",
      description: "text",
      type: ArgumentType.STRING,
      required: true
    })
  ],
  run({ reply, arguments }) {
    let text = arguments.getString('text')

    let e = new MessageEmbed()
      .setImage(`https://cataas.com/cat/cute/says/${text}`)
      .setColor("RANDOM")
      .setTitle("Cat Says")

    return reply({
      embeds: [e]
    })
  }
})