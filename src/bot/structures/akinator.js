const { MessageEmbed } = require("discord.js");
const { MessageButton, MessageActionRow } = require("gcommands");
const progressbar = require("string-progressbar");
const { Aki } = require("aki-api");
const isPlaying = new Set();

module.exports = async (input) => {
  const inputData = {
    client: input.client,
    guild: input.guild,
    author: input.author ? input.author : input.user,
    channel: input.channel,
  };

  if (isPlaying.has(inputData.author.id))
    return input.reply(" You're already in a round of Akinator. Please stop the current game to start another.");

  const gameTypeRow = new MessageActionRow().addComponents(
    new MessageButton()
      .setStyle("PRIMARY")
      .setLabel("Animal")
      .setCustomId("animal"),
    new MessageButton()
      .setStyle("PRIMARY")
      .setLabel("Character")
      .setCustomId("character"),
    new MessageButton()
      .setStyle("PRIMARY")
      .setLabel("Object")
      .setCustomId("object")
  );

  const msg = await inputData.channel.send({
    content: "Please choose a game type.",
    components: [gameTypeRow],
  });

  const filter = (interaction) => interaction.user.id === inputData.author.id;

  let gameTypeInteraction;

  try {
    gameTypeInteraction = await msg.awaitMessageComponent({
      filter,
      time: 30000,
      componentType: "BUTTON",
    });
  } catch (err) {
    return inputData.channel.send(
      `${inputData.author}, Why are you stalling?`
    );
  }

  for (let i = 0; i < gameTypeRow.components.length; i++) {
    if (
      gameTypeInteraction.customId.toLowerCase() ===
      gameTypeRow.components[i].customId.toLowerCase()
    ) {
      gameTypeRow.components[i].setStyle("SUCCESS").setDisabled(true);
    } else {
      gameTypeRow.components[i].setStyle("SECONDARY").setDisabled(true);
    }
  }

  msg.edit({
    content: "Game type chosen!",
    components: [gameTypeRow],
  });

  await gameTypeInteraction.deferUpdate();

  let finished = false;
  let hasGuessed = false;
  let lastSteps = 0;
  let region = "";

  switch (gameTypeInteraction.customId.toLowerCase()) {
    case "animal":
      region = "en_animals";
      break;

    case "character":
      region = "en";
      break;

    case "object":
      region = "en_objects";
      break;
  }

  const readyEmbed = new MessageEmbed()
    .setColor("RANDOM")
    .setAuthor({
      name: `${
        inputData.author.tag
      }'s game of Akinator - ${gameTypeInteraction.customId}`,
      iconURL: inputData.author.displayAvatarURL(),
    })
    .setTitle("Starting a round of Akinator...")
    .setDescription(
      "The game will begin shortly.\nIf the game hasn't started for over 10 seconds, I probably couldn't connect to the Akinator server. In that case, please try out the game later."
    )
    .setFooter({
      text: "We are not responsible for any questions and answers that Akinator might give.",
    })
    .setTimestamp();

  const gameMessage = await inputData.channel.send({
    embeds: [readyEmbed],
  });

  inputData.client.on("messageDelete", async (deletedMessage) => {
    if (deletedMessage.id == gameMessage.id) {
      finished = true;
      isPlaying.delete(inputData.author.id);
      await aki.win();
      return;
    }
  });

  const aki = new Aki({
    region,
    childMode: true,
  });

  await aki.start();

  isPlaying.add(inputData.author.id);

  const noResponseEmbed = new MessageEmbed()
    .setColor("RANDOM")
    .setAuthor({
      name: `${
        inputData.author.tag
      }'s game of Akinator - ${gameTypeInteraction.customId}`,
      iconURL: inputData.author.displayAvatarURL(),
    })
    .setTitle("Game ended")
    .setDescription("Your game has been ended due to inactivity.");

  const gameRow = [
    new MessageActionRow().addComponents(
      new MessageButton()
        .setStyle("SECONDARY")
        .setLabel("Yes")
        .setCustomId("yes"),
      new MessageButton()
        .setStyle("SECONDARY")
        .setLabel("No")
        .setCustomId("no"),
      new MessageButton()
        .setStyle("SECONDARY")
        .setLabel("Don't know")
        .setCustomId("dont know"),
      new MessageButton()
        .setStyle("SECONDARY")
        .setLabel("Probably")
        .setCustomId("probably"),
      new MessageButton()
        .setStyle("SECONDARY")
        .setLabel("Probably not")
        .setCustomId("probably not")
    ),
    new MessageActionRow().addComponents(
      new MessageButton()
        .setStyle("SECONDARY")
        .setLabel("Back")
        .setCustomId("back"),
      new MessageButton()
        .setStyle("DANGER")
        .setLabel("Stop")
        .setCustomId("stop")
    ),
  ];

  while (!finished) {
    if (finished) return;

    lastSteps = lastSteps + 1;

    if (
      (aki.progress >= 70 && (lastSteps >= 10 || hasGuessed === false)) ||
      aki.currentStep >= 78
    ) {
      await aki.win();

      hasGuessed = true;
      lastSteps = 0;

      const guessEmbed = new MessageEmbed()
        .setColor("RANDOM")
        .setAuthor({
          name: `${
            inputData.author.tag
          }'s game of Akinator - ${gameTypeInteraction.customId}`,
          iconURL: inputData.author.displayAvatarURL(),
        })
        .setTitle(`I'm ${Math.floor(aki.progress)}% sure your character is...`)
        .setDescription(
          `**${aki.answers[0].name}**\n${aki.answers[0].description}`
        )
        .addFields(
          {
            name: "Ranking",
            value: `#${aki.answers[0].ranking}`,
            inline: true,
          },
          {
            name: "No. of questions",
            value: aki.currentStep.toString(),
            inline: true,
          }
        )
        .setImage(aki.answers[0].absolute_picture_path)
        .setFooter({
          text: "Hmm...",
        })
        .setTimestamp();

      const guessRow = new MessageActionRow().addComponents(
        new MessageButton()
          .setStyle("SECONDARY")
          .setLabel("Yes")
          .setCustomId("yes"),
        new MessageButton()
          .setStyle("SECONDARY")
          .setLabel("No")
          .setCustomId("no")
      );

      await gameMessage.edit({
        embeds: [guessEmbed],
        components: [guessRow],
      });

      let interactionGuess;

      try {
        interactionGuess = await gameMessage.awaitMessageComponent({
          filter,
          time: 30000,
          componentType: "BUTTON",
        });
      } catch (err) {
        await gameMessage.edit({
          embeds: [noResponseEmbed],
          components: [],
        });

        await aki.win();
        finished = true;
        isPlaying.delete(inputData.author.id);
        return;
      }

      interactionGuess.deferUpdate();

      if (interactionGuess.customId === "yes") {
        const correctGameEmbed = new MessageEmbed()
          .setColor("RANDOM")
          .setAuthor({
            name: `${
              inputData.author.tag
            }'s game of Akinator - ${gameTypeInteraction.customId}`,
            iconURL: inputData.author.displayAvatarURL(),
          })
          .setTitle("Well played!")
          .setDescription("**I guessed it right one more time!**")
          .addFields(
            {
              name: "Character",
              value: aki.answers[0].name,
              inline: true,
            },
            {
              name: "Ranking",
              value: `#${aki.answers[0].ranking}`,
              inline: true,
            },
            {
              name: "No. of questions",
              value: aki.currentStep.toString(),
              inline: true,
            }
          )
          .setImage(aki.answers[0].absolute_picture_path)
          .setTimestamp();
        await gameMessage.edit({
          embeds: [correctGameEmbed],
          components: [],
        });
        finished = true;
        isPlaying.delete(inputData.author.id);
      } else if (aki.currentStep >= 78) {
        const gameFinishEmbed = new MessageEmbed()
          .setColor("RANDOM")
          .setAuthor({
            name: `${
              inputData.author.tag
            }'s game of Akinator - ${gameTypeInteraction.customId}`,
            iconURL: inputData.author.displayAvatarURL(),
          })
          .setTitle("Bravo!")
          .setDescription("**You've defeated me!**")
          .setTimestamp();
        await gameMessage.edit({
          embeds: [gameFinishEmbed],
          components: [],
        });
        finished = true;
        isPlaying.delete(inputData.author.id);
      } else {
        aki.progress = 50;
      }
    }

    if (finished) return;

    const answers = {
      yes: 0,
      no: 1,
      "dont know": 2,
      probably: 3,
      "probably not": 4,
    };

    const akiEmbed = new MessageEmbed()
      .setColor("RANDOM")
      .setAuthor({
        name: `${
          inputData.author.tag
        }'s game of Akinator - ${gameTypeInteraction.customId}`,
        iconURL: inputData.author.displayAvatarURL(),
      })
      .setTitle(`Question ${aki.currentStep + 1}`)
      .setDescription(`**${aki.question}**`)
      .setFooter({
        text: `Progress: ${
          progressbar.filledBar(100, Math.floor(aki.progress), 20)[0]
        } ${Math.floor(aki.progress)}%`,
      })
      .setTimestamp();

    await gameMessage.edit({
      embeds: [akiEmbed],
      components: gameRow,
    });

    let gameInteraction;

    try {
      gameInteraction = await gameMessage.awaitMessageComponent({
        filter,
        time: 30000,
        componentType: "BUTTON",
      });
    } catch (err) {
      await gameMessage.edit({
        embeds: [noResponseEmbed],
        components: [],
      });

      await aki.win();
      finished = true;
      isPlaying.delete(inputData.author.id);
      return;
    }

    const thinkingEmbed = new MessageEmbed()
      .setColor("RANDOM")
      .setAuthor({
        name: `${
          inputData.author.tag
        }'s game of Akinator - ${gameTypeInteraction.customId}`,
        iconURL: inputData.author.displayAvatarURL(),
      })
      .setTitle("Please wait...")
      .setDescription(
        "We are not responsible for any questions and answers that Akinator might give."
      )
      .setFooter({
        text: `Progress: ${
          progressbar.filledBar(100, Math.floor(aki.progress), 20)[0]
        } ${Math.floor(aki.progress)}%`,
      })
      .setTimestamp();

    await gameMessage.edit({
      embeds: [thinkingEmbed],
      components: [],
    });

    gameInteraction.deferUpdate();

    if (gameInteraction.customId === "back") {
      if (aki.currentStep >= 1) {
        await aki.back();
        lastSteps = lastSteps - 1;
      }
    } else if (gameInteraction.customId === "stop") {
      isPlaying.delete(inputData.author.id);
      const stopEmbed = new MessageEmbed()
        .setColor("RANDOM")
        .setAuthor({
          name: `${
            inputData.author.tag
          }'s game of Akinator - ${gameTypeInteraction.customId}`,
          iconURL: inputData.author.displayAvatarURL(),
        })
        .setTitle("Game ended")
        .setDescription(
          `**${inputData.author.username}, your game has been successfully ended!**`
        )
        .setTimestamp();
      await aki.win();
      await gameMessage.edit({
        embeds: [stopEmbed],
        components: [],
      });
      finished = true;
    } else {
      await aki.step(answers[gameInteraction.customId]);
    }
  }
};