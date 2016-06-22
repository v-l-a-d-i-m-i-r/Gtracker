(function () {
	var url = crext.baseUrl + '/api/user',
		userId;

	$(document).ajaxComplete(function (event, request) {
		if (request.status === 401) {
			_setUserId(null);
		}
	});

	function _setUserId(userID) {
		userId = userID;
	};

	crext.userService = {
		create: function (data) {
			var action = "/create";

			return $.post(url + action, data).then(function (data) {
				_setUserId(data.userId);
			}, function () {
				_setUserId(null);
			});
		},
		login: function (data) {
			var action = "/login";

			return $.post(url + action, data).then(function (data) {
				_setUserId(data.userId);
			}, function () {
				_setUserId(null);
			});
		},
		get: function () {
			return $.get(url).then(function (data) {
				_setUserId(data.userId);
			}, function () {
				_setUserId(null);
			});
		},
		logout: function () {
			var action = "/logout";

			return $.post(url + action);
		},
		getUserId: function () {
			return userId;
		}
	};
})();