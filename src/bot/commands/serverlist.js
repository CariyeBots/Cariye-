const { MessageEmbed } = require("discord.js")
const { Command, CommandType } = require("gcommands")
const OwnerOnlyInhbitor = require('../inhibitors/OwnerOnly.js');

new Command({
  name: "serverlist",
  description: "all servers only devs",
  type: [ CommandType.SLASH ],
  inhibitors: [
    new OwnerOnlyInhbitor()
  ],
  async run({ reply, client }) {

    let description =
    `Total Servers - ${client.guilds.cache.size}\n\n` +
    client.guilds.cache
		.sort((a, b) => b.memberCount - a.memberCount)
		.first(45)
		.map(r => r)
		.map((r, i) => `**${i + 1}** - ${r.name} | ${r.memberCount} Members\nID - ${r.id}`)
		.join("\n\n");

    let embed = new MessageEmbed()
      .setAuthor({
        name: client.user.tag, 
        iconURL: client.user.displayAvatarURL({dynamic : true})
      })
      .setColor("RANDOM")
      .setDescription(description);

    return reply({ embeds: [embed] });
  }
})