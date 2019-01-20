/*global Backbone */
var app = app || {};

(function () {
	'use strict';

	// clockEvent Router
	// ----------
	var clockEventRouter = Backbone.Router.extend({
		routes: {
			'*filter': 'setFilter'
		},

		setFilter: function (param) {
			// Set the current filter to be used
			app.clockEventFilter = param || '';

			// Trigger a collection filter event, causing hiding/unhiding
			// of clockEvent view items
			app.clockEvents.trigger('filter');
		}
	});

	app.clockEventRouter = new clockEventRouter();
	Backbone.history.start();
})();
