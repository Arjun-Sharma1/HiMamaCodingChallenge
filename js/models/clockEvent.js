var app = app || {};

(function () {
	'use strict';

	// clockEvent Model

	app.clockEvent = Backbone.Model.extend({
		// Default attributes for the clock event
		// Note: ClockType = true when Clocking In and false when Clocking Out
		defaults: {
			firstName: '',
			lastName: '',
			clockType: true,
			clockTime: ''
		}
	});
})();
