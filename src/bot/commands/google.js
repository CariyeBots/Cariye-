const googleIt = require('google-it');
const { MessageEmbed } = require("discord.js")
const { Command, CommandType, Argument, ArgumentType, MessageActionRow, MessageButton } = require("gcommands")

new Command({
  name: "google",
  description: "Google it",
  type: [CommandType.SLASH],
  arguments: [
    new Argument({
      name: "search",
      description: "Please write something to Google it!",
      type: ArgumentType.STRING,
      required: true
    })
  ],
  async run({ reply, arguments }) {
    let mes = arguments.getString('search')

    googleIt({ query: mes, 'no-display': 1, limit: 10 }).then((results) => {
      let tit1 = results[0].title;
      let link1 = results[0].link;
      let tit2 = results[1].title;
      let link2 = results[1].link;
      let tit3 = results[2].title;
      let link3 = results[2].link;
      let tit4 = results[3].title;
      let link4 = results[3].link;
      let tit5 = results[4].title;
      let link5 = results[4].link;

      let e = new MessageEmbed()
        .setTitle(`Here its the search results for ${mes.toLowerCase()}`)
        .setThumbnail("https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/2048px-Google_%22G%22_Logo.svg.png")
        .addField(
          "Search Results",
          `1- ${tit1}\n 2- ${tit2}\n 3- ${tit3}\n 4- ${tit4}\n 5- ${tit5}\n\n You can go link from buttons`
        )
        .setColor("RANDOM")

      let row = new MessageActionRow().addComponents([
        new MessageButton()
          .setLabel(`${tit1}`)
          .setURL(link1)
          .setStyle("LINK"),

        new MessageButton()
          .setLabel(`${tit2}`)
          .setURL(link2)
          .setStyle("LINK"),

        new MessageButton()
          .setLabel(`${tit3}`)
          .setURL(link3)
          .setStyle("LINK"),

        new MessageButton()
          .setLabel(`${tit4}`)
          .setURL(link4)
          .setStyle("LINK"),

        new MessageButton()
          .setLabel(`${tit5}`)
          .setURL(link5)
          .setStyle("LINK"),
      ]);

      return reply({
        embeds: [e],
        components: [row]
      })
    })
  }
})