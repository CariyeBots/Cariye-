const { Command, CommandType } = require("gcommands")
const { MessageEmbed } = require("discord.js")
const Genius = require("genius-lyrics");
const Client = new Genius.Client(process.env.gtoken);

new Command({
  name: "lyrics",
  description: "shows lyrics of current playing song",
  type: [CommandType.SLASH],
  run: async({ reply, client, guild }) => {

    if(!client.queue.get(guild.id)) return reply({ content: "I'm not playing anything.", ephemeral: true })

    let q = client.queue.get(guild.id).songs[0].title
    let searches = await Client.songs.search(q);
    let lyrics = await searches[0].lyrics()
    if (!lyrics) {
      return reply({
        content: "I can't fount lyrics for this song",
        ephemeral: true
      })
    }

    let embed = new MessageEmbed()
      .setAuthor({ name: `${q}'s Lyrics` })
      .setFooter({ text: `From ${client.queue.get(guild.id).songs[0].channel.name}` })
      .setColor("RANDOM")
      .setThumbnail(client.queue.get(guild.id).songs[0].thumbnail.url)

    if(lyrics.length > 4096) {
      embed.setDescription(`${lyrics.substr(0, 4093) + "…"}`)
    } else {
      embed.setDescription(lyrics)
    }

    return reply({
      embeds: [embed]
    })
  }
})