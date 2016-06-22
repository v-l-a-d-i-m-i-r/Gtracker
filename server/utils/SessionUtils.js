module.exports = {
	getSessionUserId: function(req) {
		if (req.session && req.session.userId) {
			return req.session.userId;
		}
	},
	setSessionUserId: function(req, userId) {
		req.session.setDuration(24 * 60 * 60 * 1000);
		req.session.userId = userId;
	},
	removeSession: function(req) {
		req.session.reset();
	}
}