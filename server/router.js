var mongoose = require('mongoose'),
	dbConnectionString = require('./settings.js').dbConnectionString,
	UserController = require('./controllers/UserController.js'),
	QueryController = require('./controllers/QueryController.js'),
	UserUtils = require('./utils/UserUtils.js'),
	Session = require('./utils/SessionUtils.js');

mongoose.connect(dbConnectionString);

module.exports = function(app) {
	app.post('/api/user/create', function(req, res) {
		UserController.create(req, res);
	});
	
	app.post('/api/user/login', function(req, res) {
		UserController.login(req, res);
	});
	
	app.get('/api/user', interceptor, function(req, res) {
		UserController.get(req, res);
	});
	
	app.post('/api/user/logout', function(req, res) {
		UserController.logout(req, res);
	});
	
	
	
	app.post('/api/queries', interceptor, function(req, res) {
		QueryController.create(req, res);
	});
	
	app.get('/api/queries', interceptor, function(req, res) {
		QueryController.get(req, res);
	});
	
	
	function interceptor(req, res, next) {
		var userId = Session.getSessionUserId(req);
		
		if (userId) {
			next();
		} else {
			res.sendStatus(401);
		}
	}
}