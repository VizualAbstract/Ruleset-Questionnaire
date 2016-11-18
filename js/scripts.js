if (typeof jQuery === 'undefined') {
	throw new Error('jQuery required');
}
+function ($) {
	'use strict';
	var version = $.fn.jquery.split(' ')[0].split('.')
	if ((version[0] < 2 && version[1] < 9) || (version[0] == 1 && version[1] == 9 && version[2] < 1) || (version[0] > 2)) {
		throw new Error('jQuery version 1.9.1 or higher is required. Lower than version 3 is required.');
	}
}(jQuery);

// @codekit-append "bootstrap/dropdown.js"
// @codekit-append "bootstrap/modal.js"
// @codekit-append "bootstrap/tooltip.js"
// @codekit-append "bootstrap/transition.js"
// @codekit-append "bootstrap/popover.js"
// @codekit-append "bootstrap/collapse.js"

/* Admin-tools related functions */
function rc_variable_toggler(value) {
	if (value == 'True') {
		return 'False';
	} else {
		return 'True';
	}
}
function rc_activate_trigger(variable, currentURL, value) {
	var cleanURL = currentURL;
	// Turn the URL string into an array
	var urlArray = cleanURL.split('&');
	// Clean the URL, removing the search string, but replacing it with a ?
	var location = window.location.toString().replace(window.location.search, "?");
	// We'll join the completed array into the new url as a string
	var newURL = '';
	var hasParameters = false;
	var parameterFound = false;
	// Iterate through each parameter and value pair
	for (var i = 0; i < urlArray.length; i++) {
		var parameter = urlArray[i];
		var parameterArray = parameter.split('=');
		if (urlArray.length > 0 && urlArray[i] != ""){
			hasParameters = true;
		}
		// Split the parameter and value pair
		for (var z = 0; z < parameterArray.length; z++) {
			// If the variable we want to update == the current parameter...
			if (variable == parameterArray[z]){
				parameterFound = true;
				// ..toggle the value, from True to False, or False to True
				parameterArray[1] = rc_variable_toggler(parameterArray[1]);
				// Re-join the parameter and value in a string
				var newParameterValue = parameterArray.join('=');
				// Replace string segment in old array with new string
				urlArray[i] = newParameterValue;
			}
		}
	}
	// Re-join the entire URL string
	newURL = urlArray.join('&');
	if (parameterFound === true) {
		// Parameter found. Update and reload page
		window.location.href = location + newURL;
	} else {
		// Parameter not found.
		if (hasParameters === true) {
			// If parameters exist, add, with & before
			window.location.href = location + currentURL + '&' + variable + '=' + rc_variable_toggler(value); // toggle variable trigger manually
		} else {
			// If no parameters exist, add, with ? before
			window.location.href = newURL + '?' + variable + '=' + rc_variable_toggler(value); // toggle variable trigger manually
		}
	}
}
$(function(){
	// Forms: select field, dropdown and multi-select
	$(".new__wrapper .form__select").dropkick({
		mobile: true
	});
	// Admin tools: variable toggler
	$('.admin-tools__toggler button').on('click', function(e) {
		e.preventDefault();
		var __this = $(this);
		var variable = $(this).data('toggle');
		var value = $(this).text();
		var currentURL = decodeURIComponent(window.location.search.substring(1));
		rc_activate_trigger(variable, currentURL, value);
		// $(this).text(rc_variable_toggler(value));
	});
});