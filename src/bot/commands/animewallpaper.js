const anime = require('anime-actions');
const { MessageEmbed } = require('discord.js');
const { Command, CommandType } = require('gcommands');

new Command({
  name: "animewallpaper",
  description: "random anime wallpapers",
  type: [CommandType.SLASH],
  run: async({ reply }) => {
    const embed = new MessageEmbed()
      .setTitle(`Anime Wallpapers`)
      .setImage(await anime.wallpaper())
      .setColor("RANDOM")
    reply({
      embeds: [embed]
    })
  }
})