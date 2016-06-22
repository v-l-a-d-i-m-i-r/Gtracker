var QueryRepository = require('../repositories/QueryRepository.js'),
	UserUtils = require('../utils/UserUtils.js'),
	Session = require('../utils/SessionUtils.js');

module.exports = {
	create: function (req, res) {
		var userId = Session.getSessionUserId(req),
			product = req.body;

		product.userId = userId;
		QueryRepository.createQuery(product).then(function (data) {
			return QueryRepository.getQuery(userId);
		}).then(function(data) {
			res.send(data);
		});
	},
	get: function (req, res) {
		var userId = Session.getSessionUserId(req),
			qty = parseInt(req.param('qty'));

		QueryRepository.getQuery(userId, qty).then(function (data) {
			res.send(data);
		});

	},
	delete: function (req, res) {
		QueryRepository.deleteProducts(req.body).then(function (data) {
			res.send(data);
		});
	}
}