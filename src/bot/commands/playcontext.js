const { MessageEmbed } = require('discord.js');
const { Command, CommandType } = require('gcommands');
const Player = require('../structures/Music/Player');
const { isUrl, search, getVideo } = require('../structures/Utils');

new Command({
  name: "Add to Queue",
  description: "Play song",
  type: [ CommandType.CONTEXT_MESSAGE ],
  run: async({ client, reply, arguments, guild, member, interaction }) => {
    if (!member.voice?.channel) return reply({ content: 'Beep boop voice?', ephemeral: true });
    let a = arguments.getMessage('message')

    let query = a.content;

    interaction.deferReply();

    if (!isUrl(query)) query = (await search(query, 1))[0].value;
    if (!query) return interaction.editReply({ content: `I didn't find any music. Sorry...`, ephemeral: true });

    const videos = await getVideo(query);

    for(const video of videos) await Player.play(client, guild.id, member.voice.channel.id, video);

    interaction.editReply({
      embeds: [
        new MessageEmbed()
          .setDescription(`**Requested by**: ${member.user.tag}\n**Requested**: ${videos.length} song(s)\n\n${videos.map((video, i) => { i++; return `\`${i}.\` ${video.title} - ${video.channel.name}` }).slice(0, 10).join('\n')}\nAnd more...`)
          .setColor("RANDOM")
          .setFooter({ text: member.user.tag, iconURL: member.user.displayAvatarURL({ dynamic: true }) })
          .setTimestamp()
      ],
      ephemeral: true
    });
  }
});