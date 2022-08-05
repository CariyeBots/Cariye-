const { Listener } = require('gcommands');
const { AutoPoster } = require('topgg-autoposter');
const { RainbowRole } = require("djs-rainbow");
const { ActivityType } = require("discord.js")
const axios = require("axios").default
const fetch = require('node-fetch')
const play = require('play-dl');

new Listener({
  name: "ready",
  event: "ready",
  run(client) {
    let users = 0;
    for (let guild of [...client.guilds.cache.values()]) users += guild.memberCount;

    console.log([
      `${client.user.tag} is ready!`,
      ``,
      `Servers: ${client.guilds.cache.size}`,
      `Users: ${users}`,
    ].join('\n'));

    setInterval(() => {
      const statuses = [
				`have a good day with your loved ones`,
        `with ${users} users`,
        `in ${client.guilds.cache.size} servers`,
        `ready for all commands`,
        `how about giving a chance for music commands? 🙂`,
        `/help`
      ]
      const statuss = statuses[Math.floor(Math.random() * statuses.length)]
			client.user.setActivity(statuss, { type: ActivityType.Playing });
    }, 150000)

		setInterval(() => {
			AutoPoster(process.env.topgg, client)
			fetch(`https://api.voidbots.net/bot/stats/849663572308918343`, {
    		method: "POST",
    		headers: { 
      		Authorization: process.env.voidtoken,
      		"Content-Type": "application/json"
    		},
    		body: JSON.stringify({"server_count": client.guilds.cache.size, "shard_count": 1 })
  		}).then(response => response.text()).then(console.log).catch(console.error);
		}, 300000)

    setInterval(async() => {
      await axios.get("https://camo.githubusercontent.com/50822ac66331da6cbaed87e3d931ca65ca115d35bb1e36d9123a4b73760c2539/68747470733a2f2f6b6f6d617265762e636f6d2f67687076632f3f757365726e616d653d7768617474797526636f6c6f723d626c756576696f6c6574").catch(err => console.log("error from github"));
    }, 600000);

    const Rainbow = new RainbowRole({
      client:client,
      guildId:"593049830880837634",
      roleId:"791293430805561367",
      interval:300000
    })
    Rainbow.start()
  }
})
