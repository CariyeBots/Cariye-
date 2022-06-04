const { Command, CommandType, MessageActionRow, MessageButton } = require("gcommands")
const urban = require("urban")
const { MessageEmbed } = require("discord.js")

new Command({
  name: "Urban Dictionary",
  description: "Urban Dictionary Search",
  type: [ CommandType.CONTEXT_MESSAGE ],
  async run({ reply, arguments }) {
    let w = arguments.getMessage('message')
    let a = w.content

    urban(a).first((results) => {
      if(!results) {
        return reply({ content: "This word doesn't exist", ephemeral: true })
      };
      let definition = results.definition
      let link = results.permalink
      let ex = results.example
      let tup = results.thumbs_up
      let tdown = results.thumbs_down

      let e = new MessageEmbed()
        .setTitle(`Urban Dictionary`)
        .setColor("RANDOM")
        .setThumbnail("https://i.imgur.com/ALGVUh7.png")
        .addField("Definition", definition)
        .addField("Example", ex)
        .setFooter({
          text: `👍: ${tup} | 👎: ${tdown}`
        })

      let row = new MessageActionRow().addComponents([
        new MessageButton()
          .setLabel("See on page")
          .setURL(link)
          .setStyle("LINK"),
      ]);
      
      return reply({
        embeds: [e],
        components: [row]
      })
    })
  }
})