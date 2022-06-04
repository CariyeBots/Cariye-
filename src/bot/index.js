require('dotenv').config();
const { Intents, Collection } = require('discord.js');
const x = require("../keep_alive.js");
const { join } = require('path');
const { readFileSync } = require('fs');
const { GClient, Plugins, Logger, Command, Component } = require("gcommands");
const { MongoDBProvider } = require('gcommands/dist/providers/MongoDBProvider');
require('@gcommands/plugin-moreevents');
const mongoose = require("mongoose");
Plugins.search(__dirname);

require('@gcommands/plugin-language').default({
  defaultLanguage: 'en-GB',
  languageText: JSON.parse(readFileSync(`${__dirname}/responses.json`, 'utf-8'))
});

require('@gcommands/plugin-votes').default({
  type: 'TOP.GG',
  apiKeys: process.env.topgg,
  serverAuthKey: process.env.topggwh
});

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
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_VOICE_STATES,
		Intents.FLAGS.GUILD_BANS,
		Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,
    Intents.FLAGS.GUILD_MEMBERS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_PRESENCES,
    Intents.FLAGS.DIRECT_MESSAGES,
		Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
    Intents.FLAGS.GUILD_INVITES,
    Intents.FLAGS.GUILD_INTEGRATIONS,
    Intents.FLAGS.GUILD_PRESENCES,
  ],
  dirs: [
    join(__dirname, 'commands'),
    join(__dirname, 'events')
  ],
  database: new MongoDBProvider(process.env.mongodb_uri),
	shards: "auto",
	messageSupport: true,
	messagePrefix: '!',
	partials: ['MESSAGE', 'CHANNEL', 'REACTION'],
});

client.queue = new Collection();

mongoose.connect(process.env.mongodb_uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(console.log("Success - Connected to MongoDatabase"));

client.on("userAvatarUpdate", (user, newAvatar) => {
  console.log(`${user.username} changed avatar to ${newAvatar}`)
});
client.on("userUsernameUpdate", (oldUsername, newUsername) => {
  console.log(`${oldUsername.username} -> ${newUsername}`)
});

client.on('error', console.log);
client.on('ratelimit', console.log);
client.on('warn', console.log);

client.login(process.env.token);

/*
* I'll love the light for it shows me the way, yet I'll endure the darkness because it shows me the stars.
*
* @Author
* Whattyu
*/
