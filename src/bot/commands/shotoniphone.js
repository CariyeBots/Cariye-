const axios = require('axios');
const { Command, CommandType } = require("gcommands")

new Command({
  name: "shotoniphone",
  description: "Shot On Iphone Meme",
  type: [CommandType.SLASH],
  run: async({ reply }) => {
    const url = 'https://shot-on-iphone.studio/api/video';
    let response, data;
    try {
      response = await axios.get(url);
      data = response.data;
    } catch (e) {
      return reply({ content: `An error occured!`, ephemeral: true })
    }

    reply({ content : `[Shot on iphone meme](${data.url})` })
  }
})