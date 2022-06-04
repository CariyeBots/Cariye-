const { Command, CommandType, Argument, ArgumentType, Inhibitor: { MemberPermissions }, } = require("gcommands")
const { MessageEmbed } = require("discord.js")

new Command({
  name: "kick",
  description: "kick members",
	defaultMemberPermissions: ["KICK_MEMBERS"],
  type: [ CommandType.SLASH ],
  inhibitors: [
    new MemberPermissions({
      permissions: ["KICK_MEMBERS"],
      message: "You can't use this command!",
			ephemeral: true,
    })
  ],
  arguments: [
    new Argument({
      name: "user",
      description: "Select user",
      type: ArgumentType.USER,
      required: true,
    }),
    new Argument({
      name: "reason",
      description: "provide a reason if u want",
      type: ArgumentType.STRING
    })
  ],
  run({ reply, arguments, guild, member, client }) {
    try {
      let a = arguments.getMember('user');
      let re = arguments.getString('reason');

      if (member.user.id === a.user.id) return reply({
        content: "You cannot kick **yourself**.",
        ephemeral: true
      })

			if (a.user.id === client.user.id) return reply({
      	content: "I can't kick **myself**",
      	ephemeral: true
    	});

      if (member.roles.highest.position <= a.roles.highest.position) return reply({
        content: "You cannot kick the person because you are trying to kick has **same** or **high** authority as yours.",
        ephemeral: true
      });

      guild.members.kick(a, { reason: `${re || "No reason provided"}` })

      let embed = new MessageEmbed()
        .setTitle(`${a.user.username} is Kicked`)
        .setThumbnail("https://media.giphy.com/media/l3V0j3ytFyGHqiV7W/giphy.gif")
        .setDescription(`Reason: ${re || "No reason provided"}`)
        .setColor("RANDOM")
        .setTimestamp()
        .setFooter({
          text: `Judge: ${member.user.username}`,
          iconURL: member.user.avatarURL()
        })

      return reply({
        embeds: [embed]
      })
    } catch (error) {
      console.log(error)
      return reply({
        content: "An error occurred",
        ephemeral: true
      })
    }
  }
})