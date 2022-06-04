const { Command, CommandType, Argument, ArgumentType } = require('gcommands');
const { MessageEmbed } = require("discord.js");
const Schema = require("../models/levelSchema.js");
const CSchema = require("../models/chatbotSchema.js");
const WSchema = require("../models/welcomeSchema.js");
const Admin = require('../inhibitors/AdminOnly.js');

new Command({
  name: "config",
  description: "config your chatbot channel, level channel and disable welcome event or set welcome channel",
  type: [CommandType.SLASH],
	inhibitors: [
		new Admin()
	],
  arguments: [
		new Argument({
			name: "check",
			description: "check the systems",
			type: ArgumentType.SUB_COMMAND_GROUP,
			arguments: [
				new Argument({
      		name: "chatbot",
      		description: "check chatbot channel",
      		type: ArgumentType.SUB_COMMAND,
    		}),
				new Argument({
					name: "level",
					description: "check level channel",
					type: ArgumentType.SUB_COMMAND
				}),
				new Argument({
					name: "welcome",
					description: "check welcome channel and messages",
					type: ArgumentType.SUB_COMMAND,
				})
			]
		}),
		new Argument({
			name: "set",
			description: "set chat bot, level channel and welcome channel",
			type: ArgumentType.SUB_COMMAND_GROUP,
			arguments: [
				new Argument({
      		name: "chatbot",
      		description: "set chat bot with ai",
      		type: ArgumentType.SUB_COMMAND,
					arguments: [
						new Argument({
      				name: "channel",
      				description: "select channel",
      				type: ArgumentType.CHANNEL,
							channelTypes: ['GUILD_TEXT'],
							required: true
   					}),
					]
    		}),
				new Argument({
					name: "level",
					description: "enable level system",
					type: ArgumentType.SUB_COMMAND,
					arguments: [
						new Argument({
      				name: "channel",
      				description: "select channel",
      				type: ArgumentType.CHANNEL,
							channelTypes: ['GUILD_TEXT'],
      				required: true,
    				})
					]
				}),
				new Argument({
					name: "welcome",
					description: "enable welcome system",
					type: ArgumentType.SUB_COMMAND,
					arguments: [
						new Argument({
      				name: "channel",
      				description: "select channel",
      				type: ArgumentType.CHANNEL,
							channelTypes: ['GUILD_TEXT'],
      				required: true,
   					}),
						new Argument({
      				name: "welcomemessage",
      				description: "set welcome message",
      				type: ArgumentType.STRING,
      				required: true,
   					}),
						new Argument({
      				name: "goodbyemessage",
      				description: "set goodbye message",
      				type: ArgumentType.STRING,
      				required: true,
   					}),
					]
				})
			]
		}),
		new Argument({
			name: "disable",
			description: "disable systems",
			type: ArgumentType.SUB_COMMAND_GROUP,
			arguments: [
				new Argument({
      		name: "chatbot",
      		description: "disable chat bot",
      		type: ArgumentType.SUB_COMMAND,
    		}),
				new Argument({
					name: "level",
					description: "disable level system",
					type: ArgumentType.SUB_COMMAND
				}),
				new Argument({
					name: "welcome",
					description: "disable welcome system",
					type: ArgumentType.SUB_COMMAND,
				})
			]
		})
  ],
  run: async({ arguments, reply, guild }) => {
		const gr = arguments.getSubcommandGroup();
    const sub = arguments.getSubcommand();

		if (gr === 'check') {
			if (sub === 'chatbot') {

    		CSchema.findOne({ Guild: guild.id }, async (err, data) => {
					if (err) {
						console.log(err)
						return reply({ content: `An error occurred`, ephemeral: true })
					}
					if (data.Channel === "0") return reply({ content: `Chat bot is disabled now`, ephemeral: true });
      		if (data) {
        		return reply({ content: `Chat bot channel is -> <#${data.Channel}>` });
      		} else {
        		return reply({ content: "No data found probably Chatbot isn't setuped", ephemeral: true })
      		}
    		});
			}

			if (sub === 'level') {				
				Schema.findOne({ Guild: guild.id }, async (err, data) => {
					if (err) {
						console.log(err)
						return reply({ content: `An error occurred`, ephemeral: true })
					}
					if (data.Channel === "0") return reply({ content: `Level System is disabled now`, ephemeral: true });
      		if (data) {
        		return reply({ content: `Level channel is -> <#${data.Channel}>` });
      		} else {
        		return reply({ content: "No data found probably Level system isn't setuped", ephemeral: true })
      		}
				});
			}

			if (sub === 'welcome') {
    		WSchema.findOne({ Guild: guild.id }, async (err, data) => {
					if (err) {
						console.log(err)
						return reply({ content: `An error occurred`, ephemeral: true })
					}
					if (data.Channel === "0") return reply({ content: `Welcome System is disabled now`, ephemeral: true });
      		if (data) {
        		const welcome = new MessageEmbed()
        			.setColor("RANDOM")
        			.setTitle("Welcome System")
        			.setDescription(`Welcome Channel:\n> <#${data.Channel}>\n\nWelcome Message:\n> ${data.WMessage}\n\nGoodbye Message:\n> ${data.BMessage}`)
						return reply({ embeds: [welcome] });
      		} else {
        		return reply({ content: "No data found probably Welcome system isn't setuped", ephemeral: true })
      		}
    		});
			}
		}

		if (gr === 'set') {
			if (sub === 'chatbot') {
				const channel = arguments.getChannel('channel')

    		CSchema.findOne({ Guild: guild.id }, async (err, data) => {
      		if (data) {
        		data.Channel = channel.id;
        		data.save();
      		} else {
        		new CSchema({
          		Guild: guild.id,
          		Channel: channel.id,
        		}).save();
      		}
					if (err) {
						console.log(err)
						return reply({ content: `An error occurred`, ephemeral: true })
					}

      		const chatbot = new MessageEmbed()
        		.setColor("RANDOM")
        		.setTitle("Chat Bot")
        		.setDescription(`${channel} has been set as a Chat Bot`)

					await reply({ content: "Chat bot is successfully setted", ephemeral: true });
      		await channel.send({ embeds: [chatbot] });
    		});
			}

			if (sub === 'level') {				
				const channel = arguments.getChannel('channel')

    		Schema.findOne({ Guild: guild.id }, async (err, data) => {
					
      		if (data) {
        		data.Channel = channel.id;
        		data.save();
      		} else {
        		new Schema({
          		Guild: guild.id,
          		Channel: channel.id,
        		}).save();
      		}
					if (err) {
						console.log(err)
						return reply({ content: `An error occurred`, ephemeral: true })
					}

      		const levelup = new MessageEmbed()
        		.setColor("RANDOM")
        		.setTitle("Level-UP Channel")
        		.setDescription(`${channel} has been set as a Level-UP Channel`)
        		.setThumbnail("https://media.tenor.com/images/610d120b3b048f6487ad7555e94591bc/tenor.gif")

					await reply({ content: "Level channel is successfully setted", ephemeral: true });
      		await channel.send({ embeds: [levelup] });
    		});
			}

			if (sub === 'welcome') {
				const channel = arguments.getChannel('channel')
				const welcomemessage = arguments.getString('welcomemessage')
				const byemessage = arguments.getString('goodbyemessage')

    		WSchema.findOne({ Guild: guild.id }, async (err, data) => {
      		if (data) {
        		data.Channel = channel.id;
						data.WMessage = welcomemessage;
						data.BMessage = byemessage;
        		data.save();
      		} else {
        		new WSchema({
          		Guild: guild.id,
          		Channel: channel.id,
							WMessage: welcomemessage,
							BMessage: byemessage,
        		}).save();
      		}
					if (err) {
						console.log(err)
						return reply({ content: `An error occurred`, ephemeral: true })
					}

      		const welcome = new MessageEmbed()
        		.setColor("RANDOM")
        		.setTitle("Welcome Channel")
        		.setDescription(`${channel} has been set as a Welcome Channel\n Welcome Message:\n> ${welcomemessage}\n\n Goodbye Message:\n> ${byemessage}`)

					await reply({ content: "Welcome channel is successfully setted", ephemeral: true });
      		await channel.send({ embeds: [welcome] });
    		});
			}
		}

		if (gr === "disable") {
			if (sub === 'chatbot') {
				if (!data.Channel) return reply({ content: 'ChatBot already disabled' });
				CSchema.findOne({ Guild: guild.id }, async (err, data) => {
					if (data.Channel === '0') return reply({ content: 'ChatBot already disabled' });
      		if (data) {
        		data.Channel = '0';
        		data.save();
      		} else {
        		new CSchema({
          		Guild: guild.id,
          		Channel: '0',
        		}).save();
      		}
					if (err) {
						console.log(err)
						return reply({ content: `An error occurred`, ephemeral: true })
					}

					await reply({ content: "ChatBot is successfully disabled", ephemeral: true });
    		});
			}

			if (sub === 'level') {
				Schema.findOne({ Guild: guild.id }, async (err, data) => {
					if (!data.Channel) return reply({ content: 'Level System already disabled' });
					if (data.Channel === '0') return reply({ content: 'Welcome System already disabled' });
      		if (data) {
        		data.Channel = '0';
        		data.save();
      		} else {
        		new Schema({
          		Guild: guild.id,
          		Channel: '0',
        		}).save();
      		}
					if (err) {
						console.log(err)
						return reply({ content: `An error occurred`, ephemeral: true })
					}

					return reply({ content: "Level channel is successfully disabled", ephemeral: true });
    		});
			}

			if (sub === 'welcome') {
    		Schema.findOne({ Guild: guild.id }, async (err, data) => {
					if (!data.Channel) return reply({ content: 'Welcome System already disabled' });
					if (data.Channel === '0') return reply({ content: 'Welcome System already disabled' });
      		if (data) {
        		data.Channel = '0';
        		data.save();
      		} else {
        		new WSchema({
          		Guild: guild.id,
          		Channel: '0',
        		}).save();
      		}
					if (err) {
						console.log(err)
						return reply({ content: `An error occurred`, ephemeral: true })
					}

					return reply({ content: "Welcome channel is successfully disabled", ephemeral: true });
    		});
			}
		}
  }
})