const { Command, CommandType, Argument, ArgumentType, MessageActionRow, MessageButton } = require("gcommands")
const { MessageEmbed } = require("discord.js")
const instagram = require("user-instagram")

new Command({
  name: "instagram",
  description: "Shows ig profile details",
  type: [ CommandType.SLASH ],
  arguments: [
    new Argument({
      name: "account",
      description: "account name",
      type: ArgumentType.STRING,
      required: true,
    })
  ],
  async run({ reply, arguments }) {
    let pname = arguments.getString('account')

    await instagram.authenticate(process.env.iname, process.env.ipass);
    await instagram.getUserData(pname).then(data => {
      if (!data) return reply({ content: "Account isnt found now please try again later" })
      let bio = data.getBiography()
      
      let e = new MessageEmbed()
        .setTitle(`${data.isVerified() ? `${data.getUsername()} :white_check_mark:` : ` ${data.getUsername()}`} ${data.isPrivate() ? '🔒' : ''} `)
        .setColor("RANDOM")
        .setDescription(bio)
        .setThumbnail(data.getHdProfilePicture())
        .addFields(
				  {
					  name: 'Account Full Name:',
					  value: data.getFullName(),
					  inline: true,
				  },
				  {
					  name: ':id: Account ID:',
					  value: data.getId(),
					  inline: true,
				  },
          {
					  name: 'Total Posts:',
					  value: data.getPublicationsCount().toLocaleString(),
					  inline: true,
				  },
				  {
					  name: 'Followers:',
					  value: data.getFollowersCount().toLocaleString(),
					  inline: true,
				  },
				  {
					  name: 'Following:',
					  value: data.getFollowingCount().toLocaleString(),
					  inline: true,
				  },
				  {
					  name: 'Account is Professional Account?',
					  value: data.getPublicationsCount() ? ":white_check_mark:" : "no.",
					  inline: true,
				  },
				  {
					  name: 'Account is Business Account?',
					  value: data.isProfessionalAccount() ? ':white_check_mark:' : 'nope',
					  inline: true,
				  },
			  );
      
      let row = new MessageActionRow().addComponents([
        new MessageButton()
          .setLabel("Profile")
          .setURL('https://www.instagram.com/' + pname)
          .setStyle("LINK"),
      ]);

      return reply({
        embeds: [e],
        components: [row]
      })
    })
  }
})