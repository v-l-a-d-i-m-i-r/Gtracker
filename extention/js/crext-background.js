(function () {
	crext.background = {
		init: function () {
			var that = this;

			that.User = crext.userService;
			that.Query = crext.queryService;
			that.Action = crext.actionService;
			
			that.bindChromeActions();
			that.bindSubscribers();

			that.User.get().then(function (data) {
				var qty = that.Query.getQueriesQty();

				that.Query.get(qty);
			});
		},
		bindChromeActions: function () {
			var that = this;

			chrome.webNavigation.onReferenceFragmentUpdated.addListener(function (req) {
				that.urlParser(req);
			});

			chrome.webNavigation.onCompleted.addListener(function (req) {
				that.urlParser(req);
			});
			
			chrome.browserAction.onClicked.addListener(function() {
				chrome.browserAction.setPopup({popup: "index.html"});
			});
		},
		bindSubscribers: function() {
			var that = this;
			
			that.Action.subscribe('popup-open', function() {
				that.popupOpenHandler();
			});
			
			that.Action.subscribe('login-register', function(data) {
				that.loginRegisterHandler(data);
			});
			
			that.Action.subscribe('logout', function() {
				that.logoutHandler();
			});
			
			that.Action.subscribe('change-qty', function(qty) {
				that.changeQtyHandler(qty);
			});
		},
		popupOpenHandler: function() {
			var that = this,
				userId = that.User.getUserId(),
				queries;
			
			if (userId) {
				queries = that.Query.getFromCashe();
				
				that.Action.publish("user-queries", queries);
			} else {
				that.Action.publish("unauthorized");
			}
		},
		loginRegisterHandler: function(data) {
			var that = this,
				action = data.action,
				data = data.data;
			
			that.User[action](data).always(function() {
				that.popupOpenHandler();
			});
		},
		logoutHandler: function() {
			var that = this;
			
			that.User.logout().always(function() {
				that.Action.publish("unauthorized");
			})
		},
		changeQtyHandler: function(qty) {
			var that = this;
			
			that.Query.get(qty).then(function() {
				that.popupOpenHandler();
			});
		},
		urlParser: function (req) {
			var that = this,
				rule = req.url.match(/google.com/) && req.url.match(/#q=/);
			
			if (!rule) {
				return;
			}

			that.Query.save({
				query: req.url
			})
		}
	}

	crext.background.init();
})();