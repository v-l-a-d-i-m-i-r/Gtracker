(function() {
	function _getItem(key) {
		var item = localStorage.getItem(key);
		
		return item ? JSON.parse(item) : {};
	}
	
	function _setItem (key, obj) {
		var strObj = JSON.stringify(obj);
		
		localStorage.setItem(key, strObj);
	}
	
	crext.storageService = {
		get: function(field) {
			var userId = crext.userService.getUserId(),
				item = _getItem(userId);
			
			return item[field];
		},
		set: function(field, value) {
			var userId = crext.userService.getUserId(),
				item = _getItem(userId);
			
			item[field] = value;
			
			_setItem(userId, item);
		}
	}
})();