var UserRepository = require('../repositories/UserRepository.js'),
	UserUtils = require('../utils/UserUtils.js'),
	Session = require('../utils/SessionUtils.js');

module.exports = {
	create: function (req, res) {
		UserRepository.createUser(req.body).then(function (data) {
			Session.setSessionUserId(req, data._id);
			UserUtils.sendUserParams(res, data);
		});
	},
	login: function (req, res) {
		UserRepository.getUser(req.body).then(function (data) {
			if (data) {
				Session.setSessionUserId(req, data._id);
				UserUtils.sendUserParams(res, data);
			} else {
				res.sendStatus(403);
			}
		});
	},
	logout: function (req, res) {
		Session.removeSession(req);
		res.sendStatus(401);
	},
	get: function (req, res) {
		var userId = Session.getSessionUserId(req);

		UserRepository.getUser({
			_id: userId
		}).then(function (data) {
			UserUtils.sendUserParams(res, data);
		});
	}
}