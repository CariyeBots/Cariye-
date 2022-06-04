const { Listener } = require("gcommands")
const Schema = require("../models/chatbotSchema.js");
const { Configuration, OpenAIApi } = require("openai");

new Listener({
  name: "chatbot",
  event: "messageCreate",
  run: async(message) => {
    try {
    	Schema.findOne({ Guild: message.guild.id }, async (e, data) => {
      	if (!data) return;
      	if (!message.guild) return;
      	if (message.author.bot) return;
				if (data.Channel === '0') return;

				const channel = message.guild.channels.cache.get(data.Channel);
				if (message.channel.id != channel.id) return;
				const configuration = new Configuration({
  				apiKey: process.env.openai,
				});
				const openai = new OpenAIApi(configuration);

				const completion = await openai.createCompletion("text-davinci-001", {
  				prompt: message.content,
				});
				channel.send(await completion.data.choices[0].text);
    	});
  	} catch (e) {
			console.log(e)
    	message.channel.send({ content: "Error", ephemeral: true });
  	}
  }
})

/*
	const fetched = await fetch(`https://api.affiliateplus.xyz/api/chatbot?message=${encodeURIComponent(message.content)}&botname=${encodeURIComponent('Cariye+')}&ownername=${encodeURIComponent('some people lol')}&user=${encodeURIComponent(message.member.user.username)}`, {});
			  const response = await fetched.json();

      	channel.send(response.message);
*/