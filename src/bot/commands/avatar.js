const { MessageEmbed } = require('discord.js');
const { Command, CommandType, Argument, ArgumentType } = require('gcommands');

new Command({
  name: "avatar",
  description: "gets avatar",
  type: [ CommandType.SLASH ],
  arguments: [
    new Argument({
      name: "tag",
      description: "tag whose avatar you want to know",
      type: ArgumentType.USER,
      required: true,
    })
  ],
  async run({ reply, arguments }) {
    let y = arguments.getMember("tag")

    let e = new MessageEmbed()
      .setTitle(`${y.user.username}'s Avatar`)
      .setURL(y.user.avatarURL({ dynamic: true, size: 4096, format: "png" }))
      .setColor("RANDOM")
      .setImage(y.user.avatarURL({ dynamic: true, size: 4096, format: "png" }))
    
    reply({
      embeds: [e]
    })
  }
})