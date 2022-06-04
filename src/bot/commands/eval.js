const { Command, Commands, CommandType, Argument, ArgumentType } = require("gcommands")
const OwnerOnlyInhbitor = require('../inhibitors/OwnerOnly.js');
const { MessageEmbed } = require("discord.js")
const { inspect } = require('node:util');
const { codeBlock } = require('@discordjs/builders');

new Command({
  name: "eval",
  description: "eval",
  type: [ CommandType.SLASH, CommandType.MESSAGE ],
  inhibitors: [
    new OwnerOnlyInhbitor(),
  ],
  arguments: [
    new Argument({
      name: "code",
      description: "write the code to evaluate",
      type: ArgumentType.STRING,
      required: true,
    })
  ],
  async run({ client, reply, arguments, guild, member, interaction, channel, user, message }) {
    let x = arguments.getString('code')//.split(" ").join(" ")

		let res;
		try {
			res = await Promise.resolve(eval(x));
		} catch (e) {
			res = e
		}

		let a = inspect(res)

		let b;

		if (a.length > 4096) {
			b = a.substr(0, 4075)
		} else {
			b = a
		}

		const e = new MessageEmbed()
      .setAuthor({ name: member.user.username, iconURL: member.user.avatarURL() })
      .setDescription(codeBlock('PowerShell', b))
      .setColor("RANDOM")

    return reply({
      embeds: [e]
    })

		/*
    let evaled = eval(x)

    if(!typeof evaled == "string") evaled = require("util").inspect(evaled);
    const e = new MessageEmbed()
      .setAuthor({ name: member.user.username, iconURL: member.user.avatarURL() })
      .setDescription("```PowerShell\n" + evaled + "\n```")
      .setColor("RANDOM")

    return reply({
      embeds: [e]
    })
		*/
  }
})