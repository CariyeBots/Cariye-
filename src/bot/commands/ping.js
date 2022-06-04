const { Command, CommandType } = require("gcommands");

new Command({
  name: "ping",
  description: "Checks the bots latency",
  type: [ CommandType.SLASH ],
  run({ client, reply, interaction, message }) {
    let ping =
      Date.now() - (interaction ? interaction.createdAt : message.createdAt);
    reply({
      content: `**My Ping:** **\`${ping}ms\`**\n**WS Ping:** **\`${client.ws.ping}ms\`**`,
      ephemeral: true,
    });
  }
})