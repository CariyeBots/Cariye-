const { Command, CommandType, Argument, ArgumentType, /*MessageAttachment*/ } = require('gcommands');
const { MessageEmbed } = require("discord.js")
const Levels = require("discord-xp");
Levels.setURL(process.env.mongodb_uri);
//const canvacord = require("canvacord");

new Command({
  name: "rank",
  description: "Shows your current rank!",
  type: [ CommandType.SLASH ],
	arguments: [
		new Argument({
			name: "user",
			description: "select an user if you want",
			type: ArgumentType.USER,
			required: false
		})
	],
  run: async({ reply, guild, member, arguments }) => {
    try {
			const target = arguments.getMember('user') || member
      const user = await Levels.fetch(target.id, guild.id);
      const neededXp = Levels.xpFor(parseInt(user.level) + 1);

      /*const rank = new canvacord.Rank()
        .setAvatar(
          target.displayAvatarURL({ dynamic: false, format: "png" })
        )
        .setCurrentXP(user.xp)
        .setLevel(user.level)
        .setRequiredXP(neededXp)
        .setStatus(target.presence.status || "")
        .setProgressBar("WHITE", "COLOR")
        .setUsername(target.user.username)
        .setDiscriminator(target.user.discriminator);

      rank.build().then((data) => {
        const file = new MessageAttachment(data, "rank.png");
				const e = new MessageEmbed()
					.setImage('attachment://rank.png')
					.setColor("RANDOM")
			
        return reply({
					embeds: [e],
					files: [file]
				})
      })*/
			console.log(user.position)
			const e = new MessageEmbed()
				.setTitle(`${target.user.tag}'s Rank`)
				.addField(`Level:`, user.level.toLocaleString() )
				//.addField("Rank:",  )
				.addField("XP:", `${user.xp.toLocaleString()}/${neededXp.toLocaleString()}`, false)
				.setColor("RANDOM")
				.setThumbnail(target.displayAvatarURL({ dynamic: false, format: "png" }) || "")
			
			return reply({
				embeds: [e]
			})
    } catch (e) {
      console.log(e)
    }
	}
})