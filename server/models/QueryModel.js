var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var QuerySchema = new Schema({
	userId: {type: String, required: true},
	query: {type: String, required: true},
	date: {type: Number, required: true}
});

mongoose.model('Query', QuerySchema);