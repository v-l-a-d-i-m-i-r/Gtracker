var mongoose = require('mongoose');
var QueryModel = require('../models/QueryModel.js');
var Query = mongoose.model('Query');


module.exports = {
	createQuery: function(data) {
		var product = new Query({
			userId: data.userId,
			query: data.query,
			date: new Date().getTime()
		});
		
		return product.save();
	},
	getQuery: function(userId, qty) {
		return Query.find({userId: userId}).sort("-date").limit(qty);
	}
}