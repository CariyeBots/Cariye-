const { MessageEmbed } = require("discord.js")
const { Command, CommandType, MessageActionRow, MessageSelectMenu, MessageButton } = require("gcommands")
const { VoteInhibitor } = require('@gcommands/plugin-votes');
const fetch = require('node-fetch');

new Command({
  name: "activities",
  description: "All Discord Activities",
	inhibitors: [
    new VoteInhibitor({
      message: 'You must be vote me if you want to use this command ⬎\nhttps://top.gg/bot/849663572308918343/vote'
    })
  ],
	nameLocalizations: {
    "tr": "aktiviteler"
  },
  descriptionLocalizations: {
    "tr": "tüm Discord Aktiviteleri"
  },
  type: [CommandType.SLASH],
  async run({ reply, member, client }) {
    let error = (c) => reply({ content: `:x: *${c}*`, ephemeral: true });
    if (!member.voice.channel) return error("Please connect to a voice channel");

    const row = new MessageActionRow()
			.addComponents(
				new MessageSelectMenu()
					.setCustomId('select')
					.setPlaceholder('Select a Activity')
					.addOptions([
						{
							label: 'Ask Away',
							description: 'Level 1 Server Boosts needed',
							value: 'ask'
						},
						{
							label: 'Blazing 8s',
							description: 'Level 1 Server Boosts needed',
							value: 'blazing',
							emoji: "🎴",
						},
						{
							label: 'Bobble League',
							description: 'Level 1 Server Boosts needed',
							value: 'bobble',
							emoji: "⚽",
						},
            {
							label: 'Checkers In The Park',
							description: 'Level 1 Server Boosts needed',
							value: 'checkers',
							emoji: "🏁",
						},
            {
							label: 'Chess In The Park',
							description: 'Level 1 Server Boosts needed',
							value: 'chess',
              emoji: "♟️",
						},
            {
							label: 'Land-io',
							description: 'Level 1 Server Boosts needed',
							value: 'landio'
						},
            {
							label: 'Letter League',
							description: '1 Level Server Boosts needed',
							value: 'letterleague',
							emoji: "🔤",
						},
            {
							label: 'Poker Night',
							description: '1 Level Server Boosts needed',
							value: 'poker',
							emoji: "🃏",
						},
            {
							label: 'Putt Party',
							description: '1 Level Server Boosts needed',
							value: 'puttparty',
							emoji: "⛳",
						},
            {
							label: 'Sketch Heads',
							description: 'No boost needed',
							value: 'sketchheads',
              emoji: "🎨",
						},
            {
							label: 'SpellCast',
							description: '1 Level Server Boosts needed',
							value: 'spellcast',
						},
						{
							label: 'Watch Yogether',
							description: 'No boost needed',
							value: 'youtube',
							emoji: "📺",
						},
            {
							label: 'Word Snacks',
							description: 'No boost needed',
							value: 'wordsnack',
							emoji: "🔤",
						},
					]),
			);

    let e = new MessageEmbed()
      .setTitle("Select a Activity")
      .setColor("RANDOM")

    let a = await reply({
      embeds: [e],
      components: [row],
      fetchReply: true
    })

    let collector = a.createMessageComponentCollector({
      componentType: "SELECT_MENU",
			time: 60000,
    })

    collector.on("collect", async (i) => {
			if (!i.isSelectMenu()) return;
      if(i.user.id !== member.user.id) return reply({ content: `**This is not for you!**`, ephemeral: true });
      const { DiscordTogether } = require('discord-together');
      client.discordTogether = new DiscordTogether(client);

      const value = i.values[0];
      switch (value) {
				case "blazing" :
          fetch(`https://discord.com/api/v8/channels/${member.voice.channel.id}/invites`, {
            method: "POST",
            body: JSON.stringify({
              max_age: 86400,
              max_uses: 0,
              target_application_id: "976052223358406656",
              target_type: 2,
              temporary: false,
              validate: null
            }),
            headers: {
              "Authorization": `Bot ${process.env.token}`,
              "Content-Type": "application/json"
            }
          })
          .then(res => res.json())
          .then(async invite => {
            let e = new MessageEmbed()
              .setTitle("Ask Away Game")
							.setThumbnail("https://raw.githubusercontent.com/xHyroM/discord-activities/master/activities/976052223358406656.png")
							.setDescription("Ask Away is the first ice-breaker game built for Discord! Thousands of quirky and delightful questions designed to get conversations started! Who knows you best? Who’s got a few surprises in store? Find out with Ask Away!")
							.setFooter({
								text: "Up to 10 participants"
							})
              .setColor("RANDOM");

            let row = new MessageActionRow().addComponents([
              new MessageButton()
                .setLabel("Click me to join 'Ask Away' game")
                .setURL("https://discord.gg/" + invite.code)
                .setStyle("LINK")
								.setEmoji("🎴")
            ])
            await i.deferUpdate();
            return i.editReply({
              embeds: [e],
              components: [row]
            })
          });
				break;
        case "blazing" :
          fetch(`https://discord.com/api/v8/channels/${member.voice.channel.id}/invites`, {
            method: "POST",
            body: JSON.stringify({
              max_age: 86400,
              max_uses: 0,
              target_application_id: "832025144389533716",
              target_type: 2,
              temporary: false,
              validate: null
            }),
            headers: {
              "Authorization": `Bot ${process.env.token}`,
              "Content-Type": "application/json"
            }
          })
          .then(res => res.json())
          .then(async invite => {
            let e = new MessageEmbed()
              .setTitle("Blazing 8s Game")
							.setThumbnail("https://raw.githubusercontent.com/xHyroM/discord-activities/master/activities/832025144389533716.png")
							.setDescription("Be the first to zero cards by swapping hands, skipping players, and reversing turns!")
							.setFooter({
								text: "Up to 8 participants"
							})
              .setColor("RANDOM");

            let row = new MessageActionRow().addComponents([
              new MessageButton()
                .setLabel("Click me to join 'Blazing 8s' game")
                .setURL("https://discord.gg/" + invite.code)
                .setStyle("LINK")
								.setEmoji("🎴")
            ])
            await i.deferUpdate();
            return i.editReply({
              embeds: [e],
              components: [row]
            })
          });
				break;
				case "bobble" :
          fetch(`https://discord.com/api/v8/channels/${member.voice.channel.id}/invites`, {
            method: "POST",
            body: JSON.stringify({
              max_age: 86400,
              max_uses: 0,
              target_application_id: "947957217959759964",
              target_type: 2,
              temporary: false,
              validate: null
            }),
            headers: {
              "Authorization": `Bot ${process.env.token}`,
              "Content-Type": "application/json"
            }
          })
          .then(res => res.json())
          .then(async invite => {
            let e = new MessageEmbed()
              .setTitle("Bobble League Game")
							.setThumbnail("https://cdn.discordapp.com/app-assets/947957217959759964/978769923092406413.png?size=4096")
							.setFooter({
								text: "Up to 8 participants"
							})
              .setColor("RANDOM");

            let row = new MessageActionRow().addComponents([
              new MessageButton()
                .setLabel("Click me to join 'Bobble League' game")
                .setURL("https://discord.gg/" + invite.code)
                .setStyle("LINK")
								.setEmoji("⚽")
            ])
            await i.deferUpdate();
            return i.editReply({
              embeds: [e],
              components: [row]
            })
          });
				break;
        case "checkers":
          client.discordTogether.createTogetherCode(member.voice.channel.id, 'checkers').then(async invite => {
            const embed = new MessageEmbed()
              .setTitle("Checkers In The Park Game")
							.setThumbnail("https://raw.githubusercontent.com/xHyroM/discord-activities/master/activities/832013003968348200.png")
							.setDescription("With boards spread across your server, jump between games as easily as you jump your opponent's pieces!")
							.setFooter({
								text: "Unlimited participants"
							})
              .setColor("RANDOM")

            let row = new MessageActionRow().addComponents([
              new MessageButton()
                .setLabel("Click me to join 'Checkers In The Park' game")
                .setURL(invite.code)
                .setStyle("LINK")
								.setEmoji("🏁")
            ]);
            await i.deferUpdate();
            return i.editReply({
              embeds: [embed],
              components: [row]
            })
          })
        break;
        case "chess":
          client.discordTogether.createTogetherCode(member.voice.channel.id, 'chess').then(async invite => {
            const embed = new MessageEmbed()
              .setTitle("Chess In The Park Game")
							.setThumbnail("https://raw.githubusercontent.com/xHyroM/discord-activities/master/activities/832012774040141894.png")
							.setDescription("Unleash your inner Grandmaster by playing multiple games of Chess at once vs anybody on your server.")
							.setFooter({
								text: "Unlimited participants"
							})
              .setColor("RANDOM")

            let row = new MessageActionRow().addComponents([
              new MessageButton()
                .setLabel("Click me to join 'Chess In The Park' game")
                .setURL(invite.code)
                .setStyle("LINK")
								.setEmoji("♟️")
            ]);
            await i.deferUpdate();
            return i.editReply({
              embeds: [embed],
              components: [row]
            })
          })
        break;
        case "landio":
          fetch(`https://discord.com/api/v8/channels/${member.voice.channel.id}/invites`, {
            method: "POST",
            body: JSON.stringify({
              max_age: 86400,
              max_uses: 0,
              target_application_id: "903769130790969345",
              target_type: 2,
              temporary: false,
              validate: null
            }),
            headers: {
              "Authorization": `Bot ${process.env.token}`,
              "Content-Type": "application/json"
            }
          })
          .then(res => res.json())
          .then(async invite => {
            let e = new MessageEmbed()
              .setTitle("Land-io Game")
							.setThumbnail("https://raw.githubusercontent.com/xHyroM/discord-activities/master/activities/903769130790969345.png")
							.setDescription("Pick a character and encircle new territory. Run into trails to knock out foes - careful not to hit your own!")
							.setFooter({
								text: "Up to 16 participants"
							})
              .setColor("RANDOM");

            let row = new MessageActionRow().addComponents([
              new MessageButton()
                .setLabel("Click me to join 'Land-io' game")
                .setURL("https://discord.gg/" + invite.code)
                .setStyle("LINK")
            ])
            await i.deferUpdate();
            return i.editReply({
              embeds: [e],
              components: [row]
            })
          });
        break;
        case "letterleague":
          fetch(`https://discord.com/api/v8/channels/${member.voice.channel.id}/invites`, {
            method: "POST",
            body: JSON.stringify({
              max_age: 86400,
              max_uses: 0,
              target_application_id: "879863686565621790",
              target_type: 2,
              temporary: false,
              validate: null
            }),
            headers: {
              "Authorization": `Bot ${process.env.token}`,
              "Content-Type": "application/json"
            }
          })
          .then(res => res.json())
          .then(async invite => {
            let e = new MessageEmbed()
              .setTitle("Letter League Game")
							.setThumbnail("https://raw.githubusercontent.com/xHyroM/discord-activities/master/activities/879863686565621790.png")
							.setDescription("Craft words from a set of tiles, and let your lexicon fly! It's Letter League time!")
							.setFooter({
								text: "Up to 8 participants"
							})
              .setColor("RANDOM");

            let row = new MessageActionRow().addComponents([
              new MessageButton()
                .setLabel("Click me to join 'Letter League' game")
                .setURL("https://discord.gg/" + invite.code)
                .setStyle("LINK")
								.setEmoji("🔤")
            ])
            await i.deferUpdate();
            return i.editReply({
              embeds: [e],
              components: [row]
            })
          });
        break;
        case "poker":
          client.discordTogether.createTogetherCode(member.voice.channel.id, 'poker').then(async invite => {
            const embed = new MessageEmbed()
              .setTitle("Poker Nİght Game")
							.setThumbnail("https://raw.githubusercontent.com/xHyroM/discord-activities/master/activities/755827207812677713.png")
							.setDescription("A Texas hold 'em style game where you can prove your Poker prowess!")
							.setFooter({
								text: "Up to 8 participants"
							})
              .setColor("RANDOM")

            let row = new MessageActionRow().addComponents([
              new MessageButton()
                .setLabel("Click me to join 'Poker Night' game")
                .setURL(invite.code)
                .setStyle("LINK")
								.setEmoji("🃏")
            ]);
            await i.deferUpdate();
            return i.editReply({
              embeds: [embed],
              components: [row]
            })
          })
        break;
        case "puttparty":
          client.discordTogether.createTogetherCode(member.voice.channel.id, 'puttparty').then(async invite => {
            const embed = new MessageEmbed()
              .setTitle("Putt Party Game")
							.setDescription("A putting golf game where power ups help make your next shot easier, or tougher for your opponents.")
							.setThumbnail("https://raw.githubusercontent.com/xHyroM/discord-activities/master/activities/945737671223947305.png")
							.setFooter({
								text: "Up to 8 participants"
							})
              .setColor("RANDOM")

            let row = new MessageActionRow().addComponents([
              new MessageButton()
                .setLabel("Click me to join 'Putt Party' game")
                .setURL(invite.code)
                .setStyle("LINK")
								.setEmoji("⛳")
            ]);
            await i.deferUpdate();
            return i.editReply({
              embeds: [embed],
              components: [row]
            })
          })
        break;
        case "sketchheads":
          client.discordTogether.createTogetherCode(member.voice.channel.id, 'sketchheads').then(async invite => {
            const embed = new MessageEmbed()
              .setTitle("Sketch Heads Game")
							.setDescription("A drawing game where you discover that you're either bad at drawing or your friends are bad at guessing!")
							.setThumbnail("https://raw.githubusercontent.com/xHyroM/discord-activities/master/activities/902271654783242291.png")
							.setFooter({
								text: "Up to 8 participants"
							})
              .setColor("RANDOM")

            let row = new MessageActionRow().addComponents([
              new MessageButton()
                .setLabel("Click me to join 'Sketch Heads' game")
                .setURL(invite.code)
                .setStyle("LINK")
								.setEmoji("🎨")
            ]);
            await i.deferUpdate();
            return i.editReply({
              embeds: [embed],
              components: [row]
            })
          })
        break;
        case "spellcast":
          client.discordTogether.createTogetherCode(member.voice.channel.id, 'spellcast').then(async invite => {
            const embed = new MessageEmbed()
              .setTitle("SpellCast Game")
							.setDescription("A word game where players search for words on a magical grid of letters. Challenge friends or play solo.")
							.setThumbnail("https://raw.githubusercontent.com/xHyroM/discord-activities/master/activities/852509694341283871.png")
							.setFooter({
								text: "Up to 6 participants"
							})
              .setColor("RANDOM")

            let row = new MessageActionRow().addComponents([
              new MessageButton()
                .setLabel("Click me to join 'SpellCast' game")
                .setURL(invite.code)
                .setStyle("LINK")
            ]);
            await i.deferUpdate();
            return i.editReply({
              embeds: [embed],
              components: [row]
            })
          })
        break;
        case "wordsnack":
          client.discordTogether.createTogetherCode(member.voice.channel.id, 'wordsnack').then(async invite => {
            const embed = new MessageEmbed()
              .setTitle("Word Snack Game")
							.setDescription("Whip up letter combinations in this sizzling fast word game!")
							.setThumbnail("https://raw.githubusercontent.com/xHyroM/discord-activities/master/activities/879863976006127627.png")
							.setFooter({
								text: "Up to 8 participants"
							})
              .setColor("RANDOM")

            let row = new MessageActionRow().addComponents([
              new MessageButton()
                .setLabel("Click me to join 'Word Snack' game")
                .setURL(invite.code)
                .setStyle("LINK")
								.setEmoji("🔤")
            ]);
            await i.deferUpdate();
            return i.editReply({
              embeds: [embed],
              components: [row]
            })
          })
        break;
        case "youtube":
          client.discordTogether.createTogetherCode(member.voice.channel.id, 'awkword').then(async invite => {
            const embed = new MessageEmbed()
              .setTitle("Watch Together Game")
							.setDescription("Create and watch a playlist of videos with your friends. Your choice to share the remote or not.")
							.setThumbnail("https://raw.githubusercontent.com/xHyroM/discord-activities/master/activities/880218394199220334.png")
							.setFooter({
								text: "Unlimited participants"
							})
              .setColor("RANDOM")

            let row = new MessageActionRow().addComponents([
              new MessageButton()
                .setLabel("Click me to join 'Watch Together' game")
                .setURL(invite.code)
                .setStyle("LINK")
								.setEmoji("📺")
            ]);
            await i.deferUpdate();
            return i.editReply({
              embeds: [embed],
              components: [row]
            })
          })
        break;
      }
    });
    collector.on("end", async (c, i) => {
      row.components.forEach((c) => c.setDisabled(true));
    });
  }
})
