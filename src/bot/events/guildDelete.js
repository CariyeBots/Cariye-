const { Listener } = require("gcommands");
const Schema = require("../models/levelSchema.js");
const CSchema = require("../models/chatbotSchema.js");
const WSchema = require("../models/welcomeSchema.js");

new Listener({
  name: "guildDelete",
  event: "guildDelete",
  run: async(guild) => {
    // Test
		let g = guild.client.guilds.cache.get("751355061464072205")
		let c = g.channels.cache.get("836247126388375649")
		
		await c.send({ content: "Bot " + "`" + guild.name + "`" + " adlı sunucudan ayrıldı" })
    console.log(`Bot ${guild.name} adlı sunucudan ayrıldı`)

		WSchema.findByIdAndRemove(guild.id, function (err, docs) {
			WSchema.findOne({ Guild: guild.id }, async (e, data) => {
      	if (!data) return;
    	});
			if (err){
        console.log(err)
    	}
    	else{
        console.log("Removed Guild: ", docs);
    	}
		});

		Schema.findByIdAndRemove(guild.id, function (err, docs) {
			Schema.findOne({ Guild: guild.id }, async (e, data) => {
      	if (!data) return;
    	});
			if (err){
        console.log(err)
    	}
    	else{
        console.log("Removed Guild: ", docs);
    	}
		});

		CSchema.findByIdAndRemove(guild.id, function (err, docs) {
			CSchema.findOne({ Guild: guild.id }, async (e, data) => {
      	if (!data) return;
    	});
			if (err){
        console.log(err)
    	}
    	else{
        console.log("Removed Guild: ", docs);
    	}
		});
  }
});

		/*WSchema.deleteOne({ Guild: guild.id }, async (err, data) => {
			if (err) {
				console.log(err)
			}
      if (data) {
        
      } else {
        return;
      }
    });*/