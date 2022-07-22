const { Command, CommandType, Argument, ArgumentType } = require("gcommands")
const { Configuration, OpenAIApi } = require("openai");

new Command({
  name: "ai",
  description: "talk with ai or use chatbot",
	nameLocalizations: {
    "tr": "ai"
  },
  descriptionLocalizations: {
    "tr": "yapay zeka ile konuş"
  },
  arguments: [
    new Argument({
      name: "text",
      description: "text",
			nameLocalizations: {
        "tr": "yazı"
      },
      descriptionLocalizations: {
        "tr": "konuşma yazın"
      },
      type: ArgumentType.STRING,
      required: true
    })
  ],
  type: [ CommandType.SLASH ],
  async run({ reply, arguments }) {
    let text = arguments.getString('text')

		const configuration = new Configuration({
  		apiKey: process.env.openai,
		});
		const openai = new OpenAIApi(configuration);

		const completion = await openai.createCompletion("text-davinci-001", {
  		prompt: text
		});

    return reply({
      content: completion.data.choices[0].text
    })
  }
})
