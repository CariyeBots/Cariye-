const { Command, CommandType } = require("gcommands")
const { MessageEmbed } = require("discord.js")
const warnSchema = require("../models/warnSchema.js")

new Command({
  name: "List Warnings",
  description: "See members warnings",
  type: [ CommandType.CONTEXT_USER ],
  async run({ reply, arguments, guild, client }) {
    let a = arguments.getMember('user')

    const warnDoc = await warnSchema
      .findOne({
        guildID: guild.id,
        memberID: a.id,
      })
      .catch((err) => console.log(err));

    if (!warnDoc || !warnDoc.warnings.length) {
      return reply({
				content: `${a} has no warnings`,
				ephemeral: true
			})
    }

    const data = [];

    for (let i = 0; warnDoc.warnings.length > i; i++) {
      data.push(`**ID:** ${i + 1}`);
      data.push(`**Reason:** ${warnDoc.warnings[i]}`);
      data.push(
        `**Moderator:** ${await client.users
          .fetch(warnDoc.moderator[i])
          .catch(() => "Deleted User")}`
      );
      data.push(
        `**Date:** ${"<t:" + warnDoc.date[i] + ":F>"}\n`
      );
    }

    const embed = new MessageEmbed()
      .setAuthor({
				name: a.user.username,
				iconURL: a.displayAvatarURL({ dynamic: false })
			})
      .setColor("RANDOM")
      .setDescription(data.join("\n"));

    return reply({
			embeds: [embed]
		})
  }
})