var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Schema declaration
var UserSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true
	},
	createdOn: {
		type: String,
		required: true
	}
});

// Schema compiling and exportation
module.exports = mongoose.model('User', UserSchema);