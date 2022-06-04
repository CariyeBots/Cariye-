const { Command, CommandType, Argument, ArgumentType, Inhibitor: { MemberPermissions } } = require("gcommands")
const { MessageEmbed } = require("discord.js")

new Command({
  name: "purge",
  description: "purge messages",
	defaultMemberPermissions: ["MANAGE_CHANNELS"],
  type: [ CommandType.SLASH ],
  arguments: [
    new Argument({
      name: "amount",
      description: "amount of purged message(s)",
      type: ArgumentType.INTEGER,
      required: true
    }),
    new Argument({
      name: "channel",
      description: "select channel if u want",
      type: ArgumentType.CHANNEL,
      required: false
    })
  ],
  inhibitors: [
    new MemberPermissions({
      permissions: ["MANAGE_CHANNELS"],
      message: "U cant use this command!",
      ephemeral: true,
    }),
  ],
  run({ reply, arguments, channel, member }) {
    try {
      let amount = arguments.getInteger('amount')
      let a = arguments.getChannel('channel')
      let c = a || channel;
      if(amount < 1 || amount > 100) return reply({ content: "You need to input a number between 1 and 99.", ephemeral: true });
      c.bulkDelete(parseInt(amount), true)
      let embed = new MessageEmbed()
        .setTitle(`Purged`)
        .setColor("RANDOM")
        .setDescription(`${amount} message(s) in <#${c.id}>`)
        .setFooter({ text: `From ${member.user.username}`, iconURL: member.user.avatarURL() })
        .setTimestamp()
      return reply({ embeds: [embed], ephemeral: true })
    } catch(e) {
      console.log(e)
      return reply({ content: "An error occurred, please try again", ephemeral: true })
    }
  }
})