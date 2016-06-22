(function() {
	var crext = {};
	
	crext.baseUrl = "http://localhost:3000";
	
	window.crext = crext;
	
	$.ajaxSetup({ cache: false });
})();

console.log(window.crext);