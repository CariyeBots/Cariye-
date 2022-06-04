const { Inhibitor } = require('gcommands');

class OwnerOnlyInhibitor extends Inhibitor.Inhibitor {
	constructor(options) {
		super(options);

		this.ownerIds = ['owner-id'];
	}

	run(ctx) {
		if (!this.ownerIds.includes(ctx.userId)) return ctx.reply(this.resolveMessage(ctx) || 'You can not use this command');
		else return true;
	}
}

module.exports = OwnerOnlyInhibitor;
