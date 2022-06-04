const { Command, CommandType, Argument, ArgumentType } = require("gcommands");
const OwnerOnlyInhbitor = require('../inhibitors/OwnerOnly.js');

new Command({
  name: "botconfig",
  description: "change bot name and avatar in global only developers",
  type: [ CommandType.SLASH ],
  inhibitors: [
    new OwnerOnlyInhbitor(),
  ],
  arguments: [
    new Argument({
      name: "name",
      description: "change bot name",
      type: ArgumentType.STRING,
      required: false,
    }),
    new Argument({
      name: "avatar",
      description: "change bot avatar",
      type: ArgumentType.STRING,
      required: false,
    }),
  ],
  async run({ client, reply, arguments }) {
    if(arguments.getString('name') && arguments.getString('avatar')) {
      client.user.setUsername(arguments.getString('name'))
      client.user.setAvatar(arguments.getString('avatar'))

      return reply({
        content: "Name and avatar is changed",
        ephemeral: true
      })
    }
    
    if (arguments.getString('name') & !arguments.getString('avatar')) {
      client.user.setUsername(arguments.getString('name'))
      return reply({
        content: "Name is changed",
        ephemeral: true
      })
    }
    if (!arguments.getString('name') & arguments.getString('avatar')) {
      client.user.setAvatar(arguments.getString('avatar'))
      return reply({
        content: "Avatar is changed",
        ephemeral: true
      })
    }
  }
})