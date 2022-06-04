const Discord = require('discord.js');
const { Command, CommandType, MessageActionRow, MessageButton } = require('gcommands');
const moment = require("moment");
require("moment-duration-format");

new Command({
  name: "botinfo",
  description: "shows bot info",
  type: [ CommandType.SLASH ],
  async run({ client, reply, guild, member, interaction, message }) {
    let ping = Date.now() - (interaction ? interaction.createdAt : message.createdAt);
    let users = 0;
    for (let guild of [...client.guilds.cache.values()]) users += guild.memberCount;

		const duration = moment
			.duration(client.uptime)
			.format(" D [days], H [hours], m [minutes], s [seconds]");

    let embed = new Discord.MessageEmbed()
      .setAuthor({ name: `Cariye+'s Info`, iconURL: client.user.avatarURL({format: "png"}) })
      .setThumbnail(client.user.displayAvatarURL({ format: "png", size: 4096 }))
      .setColor("RANDOM")
      .addField("About Me", `\n:man_technologist: **Developer:**\n disabled account#8272 | <@496328012741214208>\n\n :robot: **My Name:**\n Cariye+\n\n :id: **ID:**\n 849663572308918343\n\n **Servers and Users:**\n In ${client.guilds.cache.size} servers with ${users} users`)
      .addField("Technical Info", `\n**OS**\n ${process.platform.toUpperCase()}\n\n **Memory Usage**\n ${Math.floor((process.memoryUsage().heapUsed / 1024)/1024)} MB\n\n **Status**\n :white_check_mark: I will always be online`, true)
      .addField("Ping and Uptime", `\n**WS Ping**\n ${Math.floor(client.ws.ping)}ms\n\n **Bot Ping**\n ${ping}ms \n\n**Uptime**\n ${duration}`, true)
      .addField("Versions", `\n**Discord.js Version**\n ${Discord.version}\n\n **Node.js Version**\n ${process.version}`, true)
      .setTimestamp()
      .setFooter({ text: member.user.username, iconURL: member.user.avatarURL({format:"png"}) })

    let row = new MessageActionRow().addComponents([
      new MessageButton()
        .setLabel("Invite me")
        .setURL("https://discord.com/api/oauth2/authorize?client_id=849663572308918343&permissions=8&scope=bot%20applications.commands")
        .setStyle("LINK"),

      new MessageButton()
        .setLabel("Support Server")
        .setURL("https://discord.gg/J4wDA93rjd")
        .setStyle("LINK"),
      
      new MessageButton()
        .setLabel("View on Top.gg")
        .setURL("https://top.gg/bot/849663572308918343")
        .setStyle("LINK")
    ]);

    reply({
      embeds: [embed],
      components: [row]
    })
  }
})
