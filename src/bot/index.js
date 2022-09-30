const { MongoDBProvider } = require('gcommands/dist/providers/MongoDBProvider');
const { Collection, GatewayIntentBits, Partials } = require('discord.js');
const { GClient, Logger, Command, Component } = require("gcommands");
const { readFileSync } = require('fs');
const mongoose = require("mongoose");
const { join } = require('path');
require('@gcommands/plugin-language')
	.default({
		defaultLanguage: 'en-GB',
		languageText: JSON.parse(readFileSync(`${__dirname}/responses.json`, 'utf-8'))
	});
require('@gcommands/plugin-votes')
	.default({
		type: 'TOP.GG',
		apiKeys: process.env.topgg,
		serverAuthKey: process.env.topggwh
	});
require('dotenv').config();
require("../keep_alive.js");

Logger.setLevel(Logger.TRACE);

Command.setDefaults({ cooldown: '5s' });
Component.setDefaults({
	onError: (ctx, error) => {
    console.log(error)
		return ctx.reply('Oops! Something went wrong')
	}
});

const client = new GClient({
  intents: [
    GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMembers,
		GatewayIntentBits.GuildBans,
		GatewayIntentBits.GuildEmojisAndStickers,
    GatewayIntentBits.GuildIntegrations,
    GatewayIntentBits.GuildInvites,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.GuildMessages,
		GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.DirectMessages
  ],
  dirs: [
    join(__dirname, 'commands'),
    join(__dirname, 'events')
  ],
	failIfNotExists: true,
  database: new MongoDBProvider(process.env.mongodb_uri),
	messageSupport: true,
	messagePrefix: '!',
	partials: [
		Partials.Message, Partials.Channel,
		Partials.Reaction, Partials.User,
		Partials.Role, Partials.GuildMember,
		Partials.GuildInvites, Partials.ManageGuild
	],
});

client.config = require('./config.js');
client.db = new Collection();
client.queue = new Collection();

require('./structures/gwManager.js')(client);
require('./structures/gwEventsHandler.js')(client);

mongoose
	.connect(process.env.mongodb_uri)
	.then(console.log("Success - Connected to MongoDatabase"));

client.on('error', console.log);
client.on('warn', console.log);
client.rest.on('rateLimited', console.log);

client.login(process.env.token);

/*
* @AUTHOR
* Whattyu
*/
