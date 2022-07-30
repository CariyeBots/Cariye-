const { MongoDBProvider } = require('gcommands/dist/providers/MongoDBProvider');
const { GClient, Plugins, Logger, Command, Component } = require("gcommands");
const { Collection, GatewayIntentBits, Partials } = require('discord.js');
const { readFileSync } = require('fs');
const mongoose = require("mongoose");
const { join } = require('path');
require('@gcommands/plugin-language').default({ defaultLanguage: 'en-GB', languageText: JSON.parse(readFileSync(`${__dirname}/responses.json`, 'utf-8')) });
require('@gcommands/plugin-votes').default({ type: 'TOP.GG', apiKeys: process.env.topgg, serverAuthKey: process.env.topggwh });
require('dotenv').config();

Plugins.search(__dirname);

Command.setDefaults({ cooldown: '5s' });

Component.setDefaults({
	onError: (ctx, error) => {
    console.log(error)
		return ctx.reply('Oops! Something went wrong')
	}
});

Logger.setLevel(Logger.TRACE);

const client = new GClient({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildVoiceStates,
		GatewayIntentBits.GuildBans,
		GatewayIntentBits.GuildEmojisAndStickers,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.DirectMessages,
		GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.GuildInvites,
    GatewayIntentBits.GuildIntegrations
  ],
  dirs: [
    join(__dirname, 'commands'),
    join(__dirname, 'events')
  ],
	failIfNotExists: true,
  database: new MongoDBProvider(process.env.mongodb_uri),
	messageSupport: true,
	messagePrefix: '!',
	partials: [Partials.Message, Partials.Channel, Partials.Reaction],
});

client.queue = new Collection();
client.db = new Collection();

mongoose.connect(process.env.mongodb_uri).then(console.log("Success - Connected to MongoDatabase"));

client.rest.on('error', console.log);
client.rest.on('rateLimited', console.log);
client.rest.on('warn', console.log);

client.login(process.env.token);

/*
* I'll love the light for it shows me the way, yet I'll endure the darkness because it shows me the stars.
*
* @AUTHOR
* Whattyu
*/
