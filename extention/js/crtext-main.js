(function () {
	crext.main = {
		init: function init() {
			var that = this;

			that.Action = crext.actionService;
			that.bindSubscribers();
			that.bindBrowserActions();

			that.Action.publish('popup-open');
		},
		bindSubscribers: function () {
			var that = this;

			that.Action.subscribe("user-queries", function (queries) {
				that.renderUserQueries(queries);
			});

			that.Action.subscribe("unauthorized", function () {
				that.renderLoginForm();
			});
		},
		bindBrowserActions: function () {
			var that = this;
			
			$(document).on('click', 'form button', function (e) {
				var $this = $(this);

				that.buttonHandler(e, $this);
			});

			$(document).on('change', '#qty', function (e) {
				var $this = $(this);

				that.qtyHandler(e, $this);
			});

			$(document).on('click', '#logout-button', function () {
				that.logoutHandler();
			});
		},
		renderLoginForm: function () {
			crext.renderTemmlate({
				eleSelector: '#content',
				templateId: 'loginFormTmpl'
			});
		},
		renderUserQueries: function (queries) {
			crext.renderTemmlate({
				eleSelector: '#content',
				templateId: 'queriesTmpl',
				data: {
					queries: queries
				}
			});
		},
		buttonHandler: function (e, $this) {
			var that = this,
				isLoginButton = $this.attr("id") === "login-button",
				form = $this.parents('form'),
				email = form.find('#email').val(),
				password = form.find('#password').val(),
				action = isLoginButton ? "login" : "create",
				data;

			data = {
				email: email,
				password: password
			}

			that.Action.publish("login-register", {
				action: action,
				data: data
			});
		},
		qtyHandler: function (e, $this) {
			var that = this,
				qty = $this.val();

			that.Action.publish("change-qty", qty);
		},
		logoutHandler: function () {
			var that = this;
			that.Action.publish("logout");
		}
	}

	$(function () {
		crext.main.init();
	});
})();