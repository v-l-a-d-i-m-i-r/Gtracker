(function() {
	crext.renderTemmlate = function(options) {
		var eleSelector = options.eleSelector,
			templateId = options.templateId,
			data = options.data || {},
			renderedHtml;
		
		renderedHtml = tmpl(templateId, data);
		
		$(eleSelector).html(renderedHtml);
	}
})();