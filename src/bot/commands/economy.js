const { MessageEmbed } = require('discord.js');
const { Command, CommandType, Argument, ArgumentType, Inhibitor: { MemberPermissions } } = require('gcommands');
const Schema = require('../models/ecoSchema.js');
const { CooldownInhibitor } = require('@gcommands/plugin-cooldowns');

const a = [
    {
      "name": "pizza",
      "description": "Yummy, pizza!",
      "usedMessage": "🍕 | You ate delicious pizza!",
      "ids": [
        "pz"
      ],
      "sale": true,
      "price": 10,
      "usable": true
    },
    {
      "name": "apple",
      "description": "An apple a day keeps the doctor away!",
      "usedMessage": "🍎 | You ate a delicious apple.",
      "ids": [
        "pz"
      ],
      "sale": true,
      "price": 5,
      "usable": true
    },
    {
      "name": "topmedal",
      "description": "Why would you even buy this.",
      "ids": [
        "medal"
      ],
      "sale": true,
      "price": 10000000,
      "usable": false
  	}
];

new Command({
  name: "economy",
  description: "economy subcommand",
  type: [CommandType.SLASH],
  arguments: [
		new Argument({
			name: "addmoney",
			description: "give money to members or yourself",
			type: ArgumentType.SUB_COMMAND,
			inhibitors: [
				new MemberPermissions({
					permissions: ["ADMINSTRATOR"],
      		message: "You can't use this command!",
					ephemeral: true,
				})
			],
			arguments: [
				new Argument({
					name: "money",
					description: "money size",
					type: ArgumentType.NUMBER,
					required: true
				}),
				new Argument({
					name: "user",
					description: "choose member if u want",
					type: ArgumentType.USER
				})
			]
		}),
		new Argument({
			name: "balance",
			description: "see your balance",
			type: ArgumentType.SUB_COMMAND,
			arguments: [
				new Argument({
					name: "user",
					description: "choose member if u want",
					type: ArgumentType.USER
				})
			]
		}),
		/*new Argument({
			name: "leaderboard",
			description: "see the leaderboard",
			type: ArgumentType.SUB_COMMAND
		}),*/
		new Argument({
			name: "pay",
			description: "pay something to member",
			type: ArgumentType.SUB_COMMAND,
			arguments: [
				new Argument({
					name: "money",
					description: "money size",
					type: ArgumentType.NUMBER,
					required: true
				}),
				new Argument({
					name: "user",
					description: "choose member for pay",
					type: ArgumentType.USER,
					required: true
				})
			]
		}),
		new Argument({
			name: "removemoney",
			description: "take money from members or yourself",
			type: ArgumentType.SUB_COMMAND,
			inhibitors: [
				new MemberPermissions({
					permissions: ["ADMINSTRATOR"],
      		message: "You can't use this command!",
					ephemeral: true,
				})
			],
			arguments: [
				new Argument({
					name: "money",
					description: "money size",
					type: ArgumentType.NUMBER,
					required: true
				}),
				new Argument({
					name: "user",
					description: "choose member if u want",
					type: ArgumentType.USER
				})
			]
		}),
		new Argument({
			name: "work",
			description: "work and earn random money",
			inhibitors: [
        new CooldownInhibitor({
            cooldown: '12h',
            message: 'You need wait {duration} before use.'
        })
    	],
			type: ArgumentType.SUB_COMMAND,
		})
  ],
  async run({ arguments, reply, member }) {
    const sub = arguments.getSubcommand();
		
		if (sub === 'addmoney') {
			const m = arguments.getNumber('money');
			const a = arguments.getMember('user') || member;
    	Schema.findOne({ Member: a.id }, async (err, data) => {
      	if (data) {
					let b = data.Balance + m
        	data.Balance = b;
        	data.save();
      	} else {
        	new Schema({
          	Member: member.id,
          	Balance: m,
        	}).save();
      	}

				return reply({ content: arguments.getMember('user') ? `You add ${m}$ to ${arguments.getMember('user')}'s balance` : `You add ${m}$ to your balance`, ephemeral: true });
    	});
		}

		if (sub === 'balance') {
			const a = arguments.getMember('user') || member;
    	Schema.findOne({ Member: a.id }, async (err, data) => {
      	if (data) {
        	return reply({ content: arguments.getMember('user') ? `${arguments.getMember('user').user.username} have ${data.Balance}$` : `You have ${data.Balance}$`, ephemeral: true });
      	} else {
        	return reply({ content: arguments.getMember('user') ? `${arguments.getMember('user').user.username} dont have any cash` : "You dont have any cash" })
      	}
    	});
		}

		/*if (sub === 'leaderboard') {
			let c = Schema.find();

			let e = new MessageEmbed()
				.setTitle("Leaderboard")
				.setDescription(c.slice(0, 10).filter(a => a.Balance > 0).map((b, i) => `\`${i++})\` ${client.users.cache.get(b.uid)?.tag || "Unknown#0000"} - **${b.Balance}$**`).join("\n\n"))

			return reply({ embeds: [e] })
		}*/

		if (sub === 'pay') {
			const m = arguments.getNumber('money');
			const a = arguments.getMember('user');
    	Schema.findOne({ Member: member.id }, async (err, data) => {
      	if (data) {
					if (data.Balance <= m) return reply({ content: "You dont have enough cash" })
					let b = data.Balance - m
        	data.Balance = b;
        	data.save();
      	} else {
        	return reply({ content: "You cant send the money because you dont have any cash", ephemeral: true })
      	}

				return reply({ content: `You send ${m}$ to ${a.user.username}` });
    	});
			Schema.findOne({ Member: a.id }, async (err, data) => {
      	if (data) {
					let b = data.Balance + m
        	data.Balance = b;
        	data.save();
      	} else {
        	new Schema({
          	Member: a.id,
          	Balance: m,
        	}).save();
      	}
    	});
		}

		if (sub === 'removemoney') {
			const m = arguments.getNumber('money');
			const a = arguments.getMember('user') || member;
    	Schema.findOne({ Member: a.id }, async (err, data) => {
				if (m >= data.Balance) return reply({ content: `${a.user.username} dont have enough cash` })
      	if (data) {
					let b = data.Balance - m
        	data.Balance = b;
        	data.save();
      	} else {
        	return reply({ content: `${a.user.username}'s doesn't have any cash` })
      	}

				return reply({ content: arguments.getMember('user') ? `You remove ${m}$ to ${arguments.getMember('user')}'s balance` : `You remove ${m}$ to your balance`, ephemeral: true });
    	});
		}

		if (sub === 'work') {
    	Schema.findOne({ Member: member.id }, async (err, data) => {
				let m = Math.floor(Math.random() * 5000)
      	if (data) {
					let b = data.Balance + m
        	data.Balance = b;
        	data.save();
      	} else {
        	new Schema({
          	Member: member.id,
          	Balance: m,
        	}).save();
      	}
				return reply({ content: `You earned ${m}$ now you have ${data.Balance}$` })
    	});
		}
  }
})