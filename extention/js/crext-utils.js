(function() {
	crext.getQueryWords = function(url) {
		var query = url.match(/(#q=)((.)*)$/)[2];
		
		return decodeURIComponent((query + '').replace(/\+/g, '%20'));;
	}
})();