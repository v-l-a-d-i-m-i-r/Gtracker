var mongoose = require('mongoose'),
	UserModel = require('../models/UserModel.js'),
	User = mongoose.model('User');


module.exports = {
	createUser: function(data) {
		var user = new User({
			email: data.email,
			password: data.password
		});
		
		return user.save();
	},
	getUser: function(data) {
		return User.findOne(data);
	}
}