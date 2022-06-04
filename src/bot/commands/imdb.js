const { MessageEmbed } = require("discord.js");
const imdb = require("imdb-api");
const { Command, CommandType, Argument, ArgumentType } = require("gcommands")
const x = new imdb.Client({apiKey: process.env.imdb})

new Command({
  name: "imdb",
  description: "Get the information about series and movie",
  type: [ CommandType.SLASH ],
  arguments: [
    new Argument({
      name: "moviename",
      description: "text the movie name",
      type: ArgumentType.STRING,
      required: true,
    }),
  ],
  async run({ reply, arguments }) {
    const text = arguments.getString('moviename')
    let movie = x.get({"name": text})
    
    if (!movie) return reply({ content: "I dont find the movie" })
    
    let embed = new MessageEmbed()
      .setTitle(movie.title.toString())
      .setColor("RANDOM")
      .setThumbnail(movie.poster)
      .setDescription(movie.plot)
      .addField("Country", movie.country)
      .addField("Languages", movie.languages)
      .addField("Type", movie.type)
      .setFooter({ text: `Ratings: ${movie.rating}` })

    return reply({
      embeds: [embed]
    })
  }
})