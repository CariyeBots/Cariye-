const { MessageEmbed } = require("discord.js")
const fetch = require("node-fetch");
const { Command, CommandType, Argument, ArgumentType } = require("gcommands");

new Command({
  name: "translate",
  description: "translate want you want",
  type: [ CommandType.SLASH ],
  arguments: [
    new Argument({
      name: "tolang",
      description: "text languague",
      type: ArgumentType.STRING,
      required: true
    }),
    new Argument({
      name: "input",
      description: "text write something to translate",
      type: ArgumentType.STRING,
      required: true
    })
  ],
  async run({ reply, arguments }) {
    const input = arguments.getString('inp')
    const languague = arguments.getString('toLang')

    let res = await fetch(`https://luminabot.xyz/api/json/translate?text=${encodeURIComponent(input)}&tolang=${encodeURIComponent(languague)}`)
    const response = res.json();

    const embed = new MessageEmbed()
      .addFields(
        {
          name: 'Input',
          value: response.input,
          inline: true
        },
        {
          name: 'Language',
          value: response.toLang,
          inline: true
        },
        {
          name: 'Output',
          value: response.translated,
          inline: true
        }
      )
      .setColor("RANDOM")
      .setThumbnail(response.image)

    reply({ embeds: [embed] })
  }
})