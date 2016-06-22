(function () {
	var url = crext.baseUrl + '/api/queries',
		Storage = crext.storageService,
		User = crext.userService;

	crext.queryService = {
		get: function (qty) {
			return $.get(url + '?qty=' + qty).then(function (queries) {
				Storage.set('queries', queries);
			});
		},
		save: function (data) {
			return $.post(url, data).then(function (queries) {
				Storage.set('queries', queries);
			});
		},
		getFromCashe: function () {
			var userId = User.getUserId();

			return Storage.get('queries') || [];
		},
		setQueriesQty: function(qty) {
			Storage.set('qty', parseInt(qty));
		},
		getQueriesQty: function() {
			return Storage.get('qty') || 5;
		}
	}
})();