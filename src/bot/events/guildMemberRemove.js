const { Listener } = require("gcommands")
const Schema = require("../models/welcomeSchema.js");
const { MessageEmbed } = require("discord.js")

new Listener({
  name: "guildMemberRemove",
  event: "guildMemberRemove",
  run: async(member) => {
    try {
    	Schema.findOne({ Guild: member.guild.id }, async (e, data) => {
      	if (!data) return;
				if (data.Channel === '0') return;

				const channel = member.guild.channels.cache.get(data.Channel);
				const welcome = new MessageEmbed()
					.setAuthor({
						name: `${member.user.username} is left from the server`,
						iconUrl: member.user.displayAvatarURL({ dynamic: true }) || ""
					})
					.setColor(member.displayHexColor || "RANDOM")
      		.setDescription(data.BMessage)
      		.setThumbnail("https://media4.giphy.com/media/Bht33KS4YXaHS5ABOP/giphy.gif")
					.setTimestamp(Date.now())

    		channel.send({ embeds: [welcome] })
    	});
  	} catch (e) {
			console.log(e)
    	channel.send({ content: "Error", ephemeral: true });
  	}
  }
})