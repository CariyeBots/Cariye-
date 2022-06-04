const { MessageEmbed } = require("discord.js")
const { Command, CommandType, Argument, ArgumentType } = require("gcommands")

new Command({
  name: "suggestion",
  description: "suggestion to the creator for me",
  type: [ CommandType.SLASH ],
  arguments: [
    new Argument({
      name: "suggestion",
      description: "your suggestion",
      type: ArgumentType.STRING,
      required: true
    })
  ],
  run({ reply, arguments, guild, member }) {
    const tchannel = guild.channels.cache.get("835475688986640385")
    const text = arguments.getString('suggestion')
    const embed = new MessageEmbed()
      .setTitle("Suggestion")
      .setAuthor({ name: member.user.username, iconURL: member.user.avatarURL({ format: "png" }) })
      .setDescription(text)
      .setColor("RANDOM")

    tchannel.send({ embeds: [embed] })

    return reply({
      content: `I'm send your suggestion to my creator`,
      ephemeral: true
    })
  }
})