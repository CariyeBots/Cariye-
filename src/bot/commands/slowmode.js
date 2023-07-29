/* eslint-disable no-shadow-restricted-names */
const { Command, CommandType, Argument, ArgumentType, Inhibitor: { MemberPermissions } } = require('gcommands');
const { EmbedBuilder } = require('discord.js');
const ms = require('ms');

new Command({
	name: 'slowmode',
	description: 'enable or disable slowmode for channel',
	defaultMemberPermissions: ['ManageChannels'],
	inhibitors: [
		new MemberPermissions({
			permissions: ['ManageChannels'],
			message: 'You can\'t use this command!',
			ephemeral: true,
		}),
	],
	type: [ CommandType.SLASH ],
	arguments: [
		new Argument({
			name: 'disable',
			description: 'disable slowmode',
			type: ArgumentType.SUB_COMMAND,
			arguments: [
				new Argument({
					name: 'channel',
					description: 'select other channel if you want',
					type: ArgumentType.CHANNEL,
					channelTypes: ['GUILD_TEXT'],
					required: false,
				}),
			],
		}),
		new Argument({
			name: 'enable',
			description: 'enable slowmode',
			type: ArgumentType.SUB_COMMAND,
			arguments: [
				new Argument({
					name: 'time',
					description: 'time units - h(hour), m(minute), s(seconds) example: 1h 2m 3s or 2m etc.',
					type: ArgumentType.STRING,
					required: true,
				}),
				new Argument({
					name: 'channel',
					description: 'select other channel if you want',
					type: ArgumentType.CHANNEL,
					channelTypes: ['GUILD_TEXT'],
					required: false,
				}),
				new Argument({
					name: 'reason',
					description: 'provide a reason if you want',
					type: ArgumentType.STRING,
					required: false,
				}),
			],
		}),
	],
	async run({ reply, arguments, channel }) {
		const sub = arguments.getSubcommand();

		if (sub === 'disable') {
			const chan1 = arguments.getChannel('channel') || channel;
			const currentSlowmode1 = chan1.rateLimitPerUser;

			if (currentSlowmode1 === 0) {
				const slowmodeOfferror = new EmbedBuilder()
					.setDescription('Slowmode is already off')
					.setColor('Random');

				return reply({
					embeds: [slowmodeOfferror],
					ephemeral: true,
				});
			}
			chan1.setRateLimitPerUser(0, `${chan1.name}'s slowmode is disabled`);

			return reply({
				content: 'Slowmode Disabled',
				ephemeral: true,
			});
		}

		if (sub === 'enable') {
			const chan = arguments.getChannel('channel') || channel;
			const currentSlowmode = chan.rateLimitPerUser;
			const reason = arguments.getString('reason') || 'Not Specified';
			const a = arguments.getString('time');
			const time = ms(a) / 1000;

			const slowmodeError3 = new EmbedBuilder()
				.setDescription('This is not a valid time. Please write the time in the units mentioned. \n\n Time Units - h(hour), m(minute), s(seconds) \n (Example - /slowmode 5s)')
				.setColor('Random');
			if (isNaN(time)) {
				return reply({
					embeds: [slowmodeError3],
					ephemeral: true,
				});
			}

			if (time > 21600000) {
				return reply({
					content: 'Time is too high. Make sure it is below 6 hours.',
					ephemeral: true,
				});
			}

			if (currentSlowmode === time) {
				return reply({
					content: `Slowmode is already set to ${a}`,
					ephemeral: true,
				});
			}

			await chan.setRateLimitPerUser(time, reason);
			const afterSlowmode = chan.rateLimitPerUser;
			if (afterSlowmode > 0) {
				const embed = new EmbedBuilder()
					.setTitle('Slowmode Enabled')
					.addFields([
						{ name: 'Slowmode Duration', value: a },
						{ name: 'Reason', value: reason },
					])
					.setColor('Random');

				return reply({
					embeds: [embed],
				});
			}
			else if (afterSlowmode === 0) {
				return reply({
					embeds: [slowmodeError3],
					ephemeral: true,
				});
			}
		}
	},
});
