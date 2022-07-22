const { MongoDBProvider } = require('gcommands/dist/providers/MongoDBProvider');
const { GClient, Plugins, Logger, Command, Component } = require("gcommands");
const { GiveawaysManager } = require('discord-giveaways');
const { Intents, Collection } = require('discord.js');
const { readFileSync } = require('fs');
const mongoose = require("mongoose");
const { join } = require('path');
require('@gcommands/plugin-language').default({ defaultLanguage: 'en-GB', languageText: JSON.parse(readFileSync(`${__dirname}/responses.json`, 'utf-8')) });
require('@gcommands/plugin-votes').default({ type: 'TOP.GG', apiKeys: process.env.topgg, serverAuthKey: process.env.topggwh });
require('@gcommands/plugin-moreevents');
require("../keep_alive.js");
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
  failIfNotExists: true,
  database: new MongoDBProvider(process.env.mongodb_uri),
  messageSupport: true,
  messagePrefix: '!',
  partials: ['MESSAGE', 'CHANNEL', 'REACTION'],
});

client.queue = new Collection();
client.db = new Collection();
client.giveawaysManager = new GiveawaysManager(client, {
  storage: "./giveaways.json",
  default: {
    botsCanWin: false,
    embedColor: "#FF0000",
    reaction: "🎉",
    lastChance: {
      enabled: true,
      content: '⚠️ **LAST CHANCE TO ENTER !** ⚠️',
      threshold: 5000,
      embedColor: '#FF0000'
    }
  }
});

mongoose.connect(process.env.mongodb_uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(console.log("Success - Connected to MongoDatabase"));

client.on('error', console.log);
client.on('ratelimit', console.log);
client.on('warn', console.log);

client.giveawaysManager.on("giveawayReactionAdded", (giveaway, member, reaction) => {
  console.log(`${member.user.tag} entered giveaway #${giveaway.messageId} (${reaction.emoji.name})`);
});

client.giveawaysManager.on("giveawayReactionRemoved", (giveaway, member, reaction) => {
  console.log(`${member.user.tag} unreact to giveaway #${giveaway.messageId} (${reaction.emoji.name})`);
});

client.giveawaysManager.on("giveawayEnded", (giveaway, winners) => {
  console.log(`Giveaway #${giveaway.messageId} ended! Winners: ${winners.map((member) => member.user.username).join(', ')}`);
});

client.login(process.env.token);
