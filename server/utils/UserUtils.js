module.exports = {
	getCookieUserId: function(req) {
		if (req.cookies && req.cookies.userId) {
			return req.cookies.userId;
		}
	},
	sendUserParams: function (res, data) {
		res.send({
			email: data.email,
			userId: data._id
		});
	}
}