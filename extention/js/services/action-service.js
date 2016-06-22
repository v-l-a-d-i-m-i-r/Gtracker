(function () {
	var listenersCollection = {};
	
	chrome.runtime.onMessage.addListener(function (message) {
		var type = message.type,
			data = message.data,
			listeners = listenersCollection[type];
		
		if (!listeners) {
			return;
		}
		
		for (var i = 0; i < listeners.length; i++) {
			listeners[i](data);
		}
	});

	crext.actionService = {
		subscribe: function (event, cb) {
			listenersCollection[event] = listenersCollection[event] || [];
			listenersCollection[event].push(cb);
		},
		publish: function (event, data) {
			chrome.runtime.sendMessage({
				type: event,
				data: data
			});
		}
	}
})();
