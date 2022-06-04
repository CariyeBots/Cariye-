const { MessageEmbed } = require("discord.js");
var AppStore = require('app-store-scraper');
const { Command, CommandType, Argument, ArgumentType, MessageActionRow, MessageButton } = require("gcommands")

new Command({
  name: "appstore",
  description: "search apps in app store",
  type: [ CommandType.SLASH ],
  arguments: [
    new Argument({
      name: "app",
      description: "Application name",
      type: ArgumentType.STRING,
      required: true
    }),
  ],
  async run({ reply, arguments }) {
    let text = arguments.getString('app');
    
    AppStore.search({
      term: text,
      num: 1
    }).then(Data => {
      let App;

      try {
        App = JSON.parse(JSON.stringify(Data[0]));
      } catch (error) {
				console.log(error)
        return reply({
          content: `No Application Found`,
          ephemeral: true
        });
      }

      let e = new MessageEmbed()
        .setColor("RANDOM")
        .setThumbnail(App.icon)
        .setTitle(`${App.title}`)
        .setDescription(App.description)
        .addField(`Price`, App.price, true)
        .addField(`Developer`, App.developer, true)
        .addField(`Score`, App.scoreText, true)
        .setTimestamp();

      let row = new MessageActionRow().addComponents([
        new MessageButton()
          .setLabel(`App URL`)
          .setURL(App.url)
          .setStyle("LINK"),
      ]);
      
      return reply({
        embeds: [e],
        components: [row]
      })
    });
  }
})