/* eslint-disable no-shadow-restricted-names */
/* eslint-disable no-mixed-spaces-and-tabs */
const { Command, Commands, CommandType, Argument, ArgumentType, version } = require('gcommands');
const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const moment = require('moment');
require('moment-duration-format');

new Command({
	name: 'bot',
	description: 'bot subcommand -> info, help, and ping commands',
	type: [CommandType.SLASH],
	arguments: [
		new Argument({
			name: 'donation',
			description: 'donation link',
			type: ArgumentType.SUB_COMMAND,
		}),
		new Argument({
			name: 'help',
			description: 'need help, use this command',
			type: ArgumentType.SUB_COMMAND,
		}),
		new Argument({
			name: 'info',
			description: 'shows bot info',
			type: ArgumentType.SUB_COMMAND,
		}),
		new Argument({
			name: 'ping',
			description: 'check the bots latency',
			type: ArgumentType.SUB_COMMAND,
		}),
		new Argument({
			name: 'vote',
			description: 'want to help me, thanks a bunch',
			type: ArgumentType.SUB_COMMAND,
		}),
	],
	async run({ client, reply, guild, member, interaction, arguments }) {
		const sub = arguments.getSubcommand();

		if (sub === 'donation') {
			const row = new ActionRowBuilder().addComponents([
    	  new ButtonBuilder()
      	  .setLabel('Donate by Patreon')
					.setURL('https://patreon.com/cariyeplus/membership')
					.setStyle(ButtonStyle.Link),
		  ]);

			return reply({
				components: [row],
			});
		}

		if (sub === 'help') {
			const e = new EmbedBuilder()
			  .setTitle('All commands are in here')
			  .setColor('Random')
			  .setDescription(Commands.map(cmd => `\`${cmd.name}\`` + ': ' + cmd.description + ' (' + cmd.type + ')').join('\n'))
			  .setFooter({
				  text: '1: Slash | 2: Context Menu (User) | 3: Context Menu (Message)',
			  });

		  const row = new ActionRowBuilder().addComponents([
    	  new ButtonBuilder()
      	  .setLabel('Support Server / Our Community')
				  .setURL('https://discord.gg/J4wDA93rjd')
				  .setStyle(ButtonStyle.Link),

			  new ButtonBuilder()
      	  .setLabel('Support Me by Donation')
				  .setURL('https://patreon.com/cariyeplus/membership')
				  .setStyle(ButtonStyle.Link),
		  ]);

		  return reply({
			  components: [row],
			  ephemeral: true,
			  embeds: [e],
		  });
		}

		if (sub === 'info') {
			const ping = Date.now() - interaction.createdAt;
			let users = 0;
			for (guild of [...client.guilds.cache.values()]) users += guild.memberCount;

			const duration = moment
				.duration(client.uptime)
				.format(' D [days], H [hours], m [minutes], s [seconds]');

			const embed = new EmbedBuilder()
				.setAuthor({ name: 'Cariye+\'s Info', iconURL: client.user.avatarURL({ format: 'png' }) })
				.setThumbnail(client.user.displayAvatarURL({ format: 'png', size: 4096 }))
				.setColor('Random')
				.addFields([
					{ name: 'About Me', value: `\n:man_technologist: **Developer:**\n whattyu#8272 | <@496328012741214208>\n\n :robot: **My Name:**\n Cariye+\n\n :id: **ID:**\n 849663572308918343\n\n **Servers and Users:**\n In ${client.guilds.cache.size} servers with ${users} users` },
					{ name: 'Technical Info', value: `\n**OS**\n ${process.platform.toUpperCase()}\n\n **Memory Usage**\n ${Math.floor((process.memoryUsage().heapUsed / 1024) / 1024)} MB\n\n **Status**\n :white_check_mark: I will always be online`, inline: true },
					{ name: 'Ping and Uptime', value: `\n**WS Ping**\n ${Math.floor(client.ws.ping)}ms\n\n **Bot Ping**\n ${ping}ms \n\n**Uptime**\n ${duration}`, inline: true },
					{ name: 'Versions', value: `\n**Discord.js Version**\n ${version}\n\n **Node.js Version**\n ${process.version}`, inline: true },
				])
				.setTimestamp()
				.setFooter({ text: member.user.username, iconURL: member.user.avatarURL({ format:'png' }) });

			const row = new ActionRowBuilder().addComponents([
				new ButtonBuilder()
					.setLabel('Invite me')
					.setURL('https://discord.com/api/oauth2/authorize?client_id=849663572308918343&permissions=8&scope=bot%20applications.commands')
					.setStyle(ButtonStyle.Link),

				new ButtonBuilder()
					.setLabel('Support Server')
					.setURL('https://discord.gg/J4wDA93rjd')
					.setStyle(ButtonStyle.Link),

				new ButtonBuilder()
					.setLabel('View on Top.gg')
					.setURL('https://top.gg/bot/849663572308918343')
					.setStyle(ButtonStyle.Link),
			]);

			return reply({
				embeds: [embed],
				components: [row],
			});
		}

		if (sub === 'ping') {
			const ping =
        Date.now() - interaction.createdAt;
			return reply({
				content: `**My Ping:** **\`${ping}ms\`**\n**WS Ping:** **\`${client.ws.ping}ms\`**`,
				ephemeral: true,
			});
		}

		if (sub === 'vote') {
			const row = new ActionRowBuilder().addComponents([
    	  new ButtonBuilder()
      	  .setLabel('Top.gg')
				  .setURL('https://top.gg/bot/849663572308918343')
				  .setStyle(ButtonStyle.Link),

			  new ButtonBuilder()
      	  .setLabel('Discord Bot List')
				  .setURL('https://discordbotlist.com/bots/cariye-2270')
				  .setStyle(ButtonStyle.Link),

				new ButtonBuilder()
					.setLabel('Void Bots List')
					.setURL('https://voidbots.net/bot/849663572308918343/')
					.setStyle(ButtonStyle.Link),
		  ]);

		  return reply({
			  components: [row],
		  });
		}
	},
});
