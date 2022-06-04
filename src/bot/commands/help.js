const { MessageEmbed } = require("discord.js")
const { MessageActionRow, MessageButton, Command, CommandType, Commands } = require("gcommands")

new Command({
  name: "help",
  description: "need help use this",
  type: [ CommandType.SLASH ],
  async run({ reply }) {
    let e = new MessageEmbed()
      .setTitle("All commands are in here")
      .setColor("RANDOM")
      .setDescription(Commands.map(cmd => `\`${cmd.name}\`` + ": " + cmd.description + " (" + cmd.type + ")").join("\n"))
      .setFooter({
        text: '1: Slash | 2: Context Menu (User) | 3: Context Menu (Message)'
      })

    let row = new MessageActionRow().addComponents([
      new MessageButton()
        .setLabel("Support Server | Our Community")
        .setURL("https://discord.gg/J4wDA93rjd")
        .setStyle("LINK")
    ]);
    reply({
      content: "if u see a bug text me ||-> whattyu#8272 <-|| or join Support Server ||<-there **will** be very beatiful with you|| and report",
      ephemeral: true,
      components: [row],
      embeds: [e]
    })
  }
})