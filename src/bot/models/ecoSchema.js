const mongoose = require('mongoose');

const ecoSchema = new mongoose.Schema({
	Member: String,
	Balance: { type: Number, default: 0 },
})

module.exports = mongoose.model('economy', ecoSchema);