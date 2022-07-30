const { Command, Argument, ArgumentType, CommandType } = require('gcommands');
const { EmbedBuilder } = require('discord.js');
const axios = require('axios');

new Command({
  name: "8ball",
  description: "I will answer any questions",
  type: [CommandType.SLASH],
	nameLocalizations: {
    "tr": "8ball"
  },
  descriptionLocalizations: {
    "tr": "Sorularını cevaplarım"
  },
  arguments: [
    new Argument({
      name: "question",
      description: "write your question",
			nameLocalizations: {
        "tr": "soru"
      },
      descriptionLocalizations: {
        "tr": "sorunu yaz"
      },
      type: ArgumentType.STRING,
      required: true,
    })
  ],
  async run({ reply, arguments, member }) {
    let text = arguments.getString("question")
    let body = await axios.get(`https://8ball.delegator.com/magic/JSON/${encodeURIComponent(text)}`);

    if (!body) ctx.reply({
			ephemeral: true,
			allowedMentions: { repliedUser: false },
			content: 'An error occured when fetching the answer'
		});

    const e = new EmbedBuilder()
			.setTitle('🎱 8ball')
      .setAuthor({ name: member.user.username, iconURL: member.user.avatarURL() })
			.addFields([
				{ name: 'Question', value: '```\n' + body.data.magic.question + '\n```' },
				{ name: 'Answer', value: '```\n' + body.data.magic.answer + '\n```' }
			])
			.setColor("Random")
      .setFooter({ text: `Respons type: ${body.data.magic.type}` })

    return reply({ embeds: [e] })
  }
})
