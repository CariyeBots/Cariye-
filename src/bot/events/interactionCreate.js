const { Listener } = require("gcommands")
const { search } = require("youtube-sr").default;

new Listener({
  name: "interactionCreate",
  event: "interactionCreate",
  run: async(interaction) => {
    if(interaction.isAutocomplete()) {
      let query = interaction.options.getString('query', true);
      const videos = await search(query || 'Never gonna give you up', { limit: 25 });

      interaction.respond(
        videos.map(video => {
          return {
            name: video.title,
            value: video.url
          }
        })
      )
    }
  }
})