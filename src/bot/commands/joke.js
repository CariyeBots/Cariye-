const { Command, CommandType } = require('gcommands');
const axios = require("axios")

new Command({
  name: "joke",
  description: "Get a random joke",
  type: [CommandType.SLASH],
  run: async({ reply }) => {
    let buff = await axios.get("https://some-random-api.ml/joke")

    return reply({
      content: "```YAML\n" + `${buff.data.joke}` + "\n```"
    })
  }
})