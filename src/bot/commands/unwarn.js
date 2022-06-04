const { Command, CommandType, Argument, ArgumentType, Inhibitor: { MemberPermissions }, } = require("gcommands")
const { MessageEmbed } = require("discord.js")
const warnSchema = require("../models/warnSchema.js")

new Command({
  name: "unwarn",
  description: "unwarn members",
	defaultMemberPermissions: ["MODERATE_MEMBERS"],
  inhibitors: [
    new MemberPermissions({
      permissions: ["BAN_MEMBERS", "ADMINISTRATOR"],
      message: "You can't use this command!",
			ephemeral: true,
    })
  ],
  type: [ CommandType.SLASH ],
  arguments: [
    new Argument({
      name: "user",
      description: "Select user",
      type: ArgumentType.USER,
      required: true,
    }),
		new Argument({
      name: "id",
      description: "type warn id (see in warnings)",
      type: ArgumentType.STRING,
      required: true,
    }),
		new Argument({
      name: "reason",
      description: "provide a reason if you want",
      type: ArgumentType.STRING,
      required: false,
    })
  ],
  async run({ reply, arguments, guild, client, member }) {
    let a = arguments.getMember('user');
		let id = arguments.getString('id');
		let reason = arguments.getString('reason') || "No reason provided";
		const warnID = parseInt(id);

    const warnDoc = await warnSchema
      .findOne({
        guildID: guild.id,
        memberID: a.id,
      })
      .catch((err) => console.log(err));

    if (!warnDoc || !warnDoc.warnings.length) {
      const unwarnError3 = new MessageEmbed()
        .setDescription(`${a} does not have any warnings`)
        .setColor("RANDOM");
      return reply({
				embeds: [unwarnError3],
				ephemeral: true
			});
    }

    if (warnID <= 0 || warnID > warnDoc.warnings.length) {
      const unwarnError4 = new MessageEmbed()
        .setDescription(
          "This is an invalid warning ID. \n To check warn ID, use /warnings"
        )
        .setColor("RANDOM");
      return reply({
				embeds: [unwarnError4],
				ephemeral: true
			});
    }

    warnDoc.warnings.splice(warnID - 1, warnID !== 1 ? warnID - 1 : 1);

    await warnDoc.save().catch((err) => console.log(err));

    const embed = new MessageEmbed()
      .setDescription(
        `Unwarned ${a} \n **Reason:** ${reason}`)
      .setColor("RANDOM");

    return reply({
			embeds: [embed]
		})
  }
})