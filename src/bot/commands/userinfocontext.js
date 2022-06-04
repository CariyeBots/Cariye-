const { Command, CommandType } = require('gcommands');
const { MessageEmbed } = require("discord.js");
const { time } = require('@discordjs/builders');
 
new Command({
	name: 'User Info',
	description: 'user info',
	type: [CommandType.CONTEXT_USER],
	async run({ reply, arguments }) {
    const a = arguments.getMember('user')
    let e = new MessageEmbed()
      .setAuthor({
        name: `${a.user.username}'s info`,
        iconURL: a.user.avatarURL({ dynamic: true })
      })
      .setColor(a.displayHexColor || "RANDOM")
      .addField("Username", a.user.username.toString(), true)
      .addField("Discriminator", `#${a.user.discriminator.toString()}`, true)
      .addField("Nickname", a.nickname || 'none', true)
      .addField("Highest Role", a.roles.highest.toString(), true)
      .addField(`Roles List [${a.roles.cache.size}]`, a.roles.cache.map(r => r).join(', '), true)
      .addField("Flags", a.user?.flags?.toArray().toString() || "no flags", true)
      .addField("Timeout", a.user.isCommunicationDisabled ? a.user.communicationDisabledUntil : '❌', true)
      .addField("Joined At", time(a.joinedAt, 'R'))
      .addField("Created At", time(a.user.createdAt, 'F'))
      .setThumbnail(a.user.avatarURL({ dynamic: true, size: 4096, format: "png" }))

		return reply({
      embeds: [e]
    })
	}
});