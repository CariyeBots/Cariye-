const { MessageEmbed } = require('discord.js');
const { Command, CommandType } = require('gcommands');

new Command({
  name: "Avatar",
  description: "gets avatar",
  type: [ CommandType.CONTEXT_USER ],
  async run({ reply, arguments }) {
    let y = arguments.getMember("user")

    let e = new MessageEmbed()
      .setTitle(`${y.user.username}'s Avatar`)
      .setURL(y.user.avatarURL({ dynamic: true, size: 4096, format: "png" }))
      .setColor("RANDOM")
      .setImage(y.user.avatarURL({ dynamic: true, size: 4096, format: "png" }))

    return reply({
      embeds: [e]
    })
  }
})