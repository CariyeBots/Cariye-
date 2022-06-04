const { Listener } = require("gcommands")
const { MessageEmbed } = require('discord.js')

new Listener({
  name: "guildCreate",
  event: "guildCreate",
  run: async(guild) => {
    let embed = new MessageEmbed()
      .setTitle('Thanks for inviting me!')
      .setDescription(`Here is some information about me. Please run /help to get all available commands and /config for welcome events, level system and chatbot \n Please don't panic if I suddenly stop working because most likely the bug has been fixed or a new feature has come.\n My owner is <@918527458582622238> [wh#1249](https://discord.com/users/918527458582622238) if u see any bug text creator pls :)`)
      .setColor('RANDOM')
      .setTimestamp()
      .setThumbnail("https://media.giphy.com/media/jmwxp4P65dy477c5a9/giphy.gif")

    const channel = guild.channels.cache.find(a => a.isText() && a.permissionsFor(guild.me))
    channel.send({ embeds: [embed] })

    // Test
		let g = guild.client.guilds.cache.get("751355061464072205")
		let c = g.channels.cache.get("836247126388375649")

		let e = new MessageEmbed()
      .setTitle("Bot " + "`"  + guild.name + "`" + " adlı sunucuya katıldı🎉")
      .setDescription(`Server ID: ${guild.id}\n\nÜye Sayısı: ${guild.members.cache.size}`)
      .setColor('RANDOM')
      .setTimestamp()

		await c.send({ embeds: [e] })
		//await c.send({ content: "Bot " + "`"  + guild.name + "`" + " adlı sunucuya katıldı" })
    console.log(`Bot ${guild.name} adlı sunucuya katıldı`)
  }
})