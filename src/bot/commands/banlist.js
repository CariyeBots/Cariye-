const { Command, CommandType, Inhibitor: { MemberPermissions }, } = require("gcommands")
const { MessageEmbed } = require("discord.js")

new Command({
  name: "banlist",
  description: "get ban list",
	defaultMemberPermissions: ["BAN_MEMBERS"],
  inhibitors: [
    new MemberPermissions({
      permissions: ["BAN_MEMBERS"],
      message: "You can't use this command!",
			ephemeral: true,
    })
  ],
  type: [ CommandType.SLASH ],
  async run({ reply, guild }) {
		guild.bans.fetch()
    .then(banned => {
      let list = banned.map(ban => "`" + ban.user.tag + "`").join('\n');

			if (list.length >= 1950) list = `${list.slice(0, 1947)}...`;

			let embed = new MessageEmbed()
      	.setTitle(`Ban List`)
      	.setDescription(list)
      	.setColor("RANDOM")
      	.setTimestamp()

    	return reply({
      	embeds: [embed]
    	})
		})
  }
})