const { Command, CommandType, Argument, ArgumentType } = require("gcommands")
const { MessageEmbed } = require("discord.js")
const weather = require("weather-js")

new Command({
  name: "weather",
  description: "Shows the weather for the place from celcius",
  type: [CommandType.SLASH],
  arguments: [
    new Argument({
      name: "location",
      description: "location name",
      type: ArgumentType.STRING,
      required: true
    })
  ],
  async run({ reply, arguments, member }) {
    let location = arguments.getString('location')
    await weather.find({search: location, degreeType: "C" }, function(err, result) {
      try {
        let e = new MessageEmbed()
          .setTitle(`Weather in ${result[0].location.name}`)
          .setThumbnail(result[0].current.imageURL)
          .setColor("RANDOM")
          .addFields(
            { name: "Date", value: result[0].current.date },
            { name: "Weather Event", value: result[0].current.skytext },
            { name: "Temperature", value: result[0].current.temperature },
            { name: "Feeling Temperature", value: result[0].current.feelslike },
            { name: "Humidity", value: result[0].current.humidity },
            { name: "Wind Speed", value: result[0].current.windspeed }
          )

        return reply({ embeds: [e] })
      } catch(err) {
        return reply({
          content: err,
          ephemeral: true
        })
      }
    })
  }
})