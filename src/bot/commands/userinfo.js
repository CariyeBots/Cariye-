const { MessageEmbed } = require('discord.js');
const { Command, CommandType, Argument, ArgumentType } = require('gcommands');
const { time } = require('@discordjs/builders');

new Command({
  name: "userinfo",
  description: "Check user informations",
  type: [ CommandType.SLASH ],
  arguments: [
    new Argument({
      name: "user",
      description: "Select user",
      type: ArgumentType.USER,
      required: false,
    })
  ],
  async run({ reply, arguments, member }) {
    let a = arguments.getMember("user") || member;

    const embed = new MessageEmbed()
      .setAuthor({
        name: a.user.tag.toString(),
        iconURL: a.user.displayAvatarURL({ dynamic: true }),
      })
      .addField("Username", a.user.username.toString(), true)
      .addField("Discriminator", `#${a.user.discriminator.toString()}`, true)
      .addField("Nickname", a.nickname || 'none', true)
      .addField("Highest Role", a.roles.highest.toString(), true)
      .addField(`Roles List [${a.roles.cache.size}]`, a.roles.cache.map(r => r).join(', '), true)
      .addField("Flags", a.user?.flags?.toArray().toString() || "no flags", true)
      .addField("Timeout", a.user.isCommunicationDisabled ? a.user.communicationDisabledUntil : '❌', true)
      .addField("Joined At", time(a.joinedAt, 'R'))
      .addField("Created At", time(a.user.createdAt, 'F'))
      .setColor(a.displayHexColor || "RANDOM")
      .setThumbnail(a.user.displayAvatarURL({ dynamic: true, format: "png", size: 4096 }))
      .setTimestamp();

    return reply({
      embeds: [embed],
    })
  }
})