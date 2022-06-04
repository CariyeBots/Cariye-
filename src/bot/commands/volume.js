const { Command, Argument, ArgumentType, CommandType } = require('gcommands');

new Command({
  name: "volume",
  description: "Change song volume",
  type: [ CommandType.SLASH ],
  arguments: [
    new Argument({
      name: "volume",
      description: "volume",
      type: ArgumentType.INTEGER,
      required: true
    })
  ],
  run: ({ reply, client, guild, member, arguments }) => {
    if (!member.voice?.channel) return reply({ content: 'Beep boop voice?', ephemeral: true });

    const queue = client.queue.get(guild.id);
    if (!queue) return reply({ content: 'Beep boop queue?', ephemeral: true });

    const volume = arguments.getInteger('volume');
    if (volume > 100 || volume < 1) return reply({ content: 'No, `v<100 && v>1`', ephemeral: true });

    queue.connection.state.subscription.player.state.resource.volume.setVolume(volume / 100);

    return reply({
      content: `Done! New volume is \`${volume}%\``,
      ephemeral: true
    });
	}
});