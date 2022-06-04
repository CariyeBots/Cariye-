const { Command, CommandType, Argument, ArgumentType } = require('gcommands');
let	figlet = require("figlet")
let	util = require("util")
let	figletAsync = util.promisify(figlet);
const zalgo = require('to-zalgo')

new Command({
  name: "text",
  description: "text commands | subcommand",
  type: [CommandType.SLASH],
  arguments: [
		new Argument({
			name: "ascii",
			description: "ascii command",
			type: ArgumentType.SUB_COMMAND,
  		arguments: [
    		new Argument({
      		name: "text",
      		description: "text",
      		type: ArgumentType.STRING,
      		required: true,
    		})
  		],
		}),
		new Argument({
			name: "emojify",
			description: "convert your text to emojis",
			type: ArgumentType.SUB_COMMAND,
  		arguments: [
    		new Argument({
      		name: "text",
      		description: "text",
      		type: ArgumentType.STRING,
      		required: true,
    		})
  		],
		}),
		new Argument({
			name: "reverse",
			description: "Reverses the given text",
			type: ArgumentType.SUB_COMMAND,
  		arguments: [
    		new Argument({
      		name: "text",
      		description: "text",
      		type: ArgumentType.STRING,
      		required: true,
    		})
  		],
		}),
		new Argument({
			name: "vaporwave",
			description: "Transform your input to a string containing fixed-width characters",
			type: ArgumentType.SUB_COMMAND,
  		arguments: [
    		new Argument({
      		name: "text",
      		description: "text",
      		type: ArgumentType.STRING,
      		required: true,
    		})
  		],
		}),
		new Argument({
			name: "zalgo",
			description: "Converts your text to Zalgo",
			type: ArgumentType.SUB_COMMAND,
  		arguments: [
    		new Argument({
      		name: "text",
      		description: "text",
      		type: ArgumentType.STRING,
      		required: true,
    		})
  		],
		}),
  ],
  run: async({ arguments, reply }) => {
    const sub = arguments.getSubcommand();

		if (sub === 'ascii') {
			let text = arguments.getString("text")
    	let rendered = await figletAsync(text)
    	return reply({
      	content: "```AsciiDoc\n\n" + rendered + "\n\n```"
    	})
		}

		if (sub === 'emojify') {
			let text = arguments.getString('text');
    	let word = '';
    	function GetCharacter(input){
      	if(("abcdefghijklmnopqrstuvwxyz").includes(input)){
        	return ':regional_indicator_' + input + ":";
      	}else{
        	switch (input) {
          	case "0":
            	return ':zero:'
          	break;
          	case "1":
            	return ':one:'
          	break;
          	case "2":
            	return ':two:'
          	break;
          	case "3":
            	return ':three:'
          	break;
          	case "4":
            	return ':four:'
          	break;
          	case "5":
            	return ':five:'
          	break;
          	case "6":
            	return ':six:'
          	break;
          	case "7":
            	return ':seven:'
          	break;
          	case "8":
            	return ':eight:'
          	break;
          	case "9":
            	return ':nine:'
          	break;
          	case "!":
            	return ':grey_exclamation:'
          	break;
          	case "<":
            	return ':arrow_backward:'
          	break;
          	case ">":
            	return ':arrow_forward:'
          	break;
          	case ",":
            	return ','
          	break;
          	case ".":
            	return '.'
          	break;
          	case "@":
            	return '@'
          	break;
          	case "?":
            	return ':question:'
          	break;
          	default:
            	return ' ' 
          	break;
        	}
      	}
    	}
    	text.toLowerCase().split('').forEach(function(char){ word += char ? GetCharacter(char) : " "})
    	return reply({
      	content: word
    	})
		}

		if (sub === 'reverse') {
			const text = arguments.getString('text')
		
			let Rarray = text.split("")
    	let reverseArray = Rarray.reverse()
    	let result = reverseArray.join("")
			
			return reply({
				content: result
			})
		}

		if (sub === 'vaporwave') {
			const a = arguments.getString('text');

			function vaporiseText(string = "") {88
      	string = string.split(" ").join("　");
      	return string
        	.split("")
        	.map((char) => {
          	const result = char.charCodeAt(0);

          	return result >= 33 && result <= 126
            	? String.fromCharCode(result - 33 + 65281)
            	: char;
        	})
        	.join("");
    	}

			return reply({
				content: vaporiseText(a)
			})
		}

		if (sub === 'zalgo') {
			var string = arguments.getString('text')

    	return reply({
      	content: zalgo(string)
    	})
		}
  }
})