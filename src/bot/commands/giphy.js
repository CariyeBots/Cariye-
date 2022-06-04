const { Command, CommandType, Argument, ArgumentType, MessageActionRow, MessageButton } = require("gcommands")
const { MessageEmbed } = require("discord.js")
const giphy = require('giphy-api')("W8g6R14C0hpH6ZMon9HV9FTqKs4o4rCk");

new Command({
  name: "giphy",
  description: "search gifs on giphy",
  arguments: [
    new Argument({
      name: "text",
      description: "text",
      type: ArgumentType.STRING,
      required: true
    })
  ],
  type: [ CommandType.SLASH ],
  async run({ reply, arguments, member }) {
    let text = arguments.getString('text')

    await giphy.search(text).then(function (res) {
      let id = res.data[0].id;
      let msgurl = `https://media.giphy.com/media/${id}/giphy.gif`;
      
      let e = new MessageEmbed()
        .addField( "Search Term", text.toString(), true )
        .setImage(msgurl)
        .setColor("RANDOM")
        .setTimestamp()
        .setFooter({
          text: "Powered by Giphy",
          iconURL: "https://raw.githubusercontent.com/Giphy/GiphyAPI/f68a8f1663f29dd9e8e4ea728421eb2977e42d83/api_giphy_logo_sparkle_clear.gif"
        })
      
      let row = new MessageActionRow().addComponents([
        new MessageButton()
          .setLabel("Page URL")
          .setURL(`https://giphy.com/search/${text}`)
          .setStyle("LINK")
      ]);

      return reply({
        embeds: [e],
        components: [row]
      })
    })
  }
})