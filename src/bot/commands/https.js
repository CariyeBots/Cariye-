const { Command, CommandType, Argument, ArgumentType } = require('gcommands');
const axios = require("axios");

new Command({
  name: "https",
  description: "check http status code",
  type: [ CommandType.SLASH ],
  arguments: [
    new Argument({
      name: "statuscode",
      description: "write a status code",
      type: ArgumentType.STRING,
      required: true,
    }),
  ],
  async run({ reply, arguments }) {
    var res = (await axios({
      url: new URL("https://api.hyrousek.tk/useless/http?code="+encodeURIComponent(arguments.getString('statuscode'))).toString(),
      responseType: "json"
    })).data;

    return reply({
      content: `**${res.code}, ${res.name}**\n${res.desc}`
    })
  }
})